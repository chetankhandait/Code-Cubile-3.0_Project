import os
import requests
from dotenv import load_dotenv
from datetime import datetime
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from phi.assistant import Assistant
from phi.llm.google import Gemini
from fastapi.responses import StreamingResponse
import asyncio
import random
# Load environment variables from .env file
load_dotenv()

# Fetch API keys from environment variables
polygon_api_key = os.getenv("FINANCIAL_API_KEY")
google_api_key = os.getenv("GOOGLE_API_KEY")

# Verify API keys
if not polygon_api_key:
    raise ValueError("FINANCIAL_API_KEY is not set in the environment variables.")
if not google_api_key:
    raise ValueError("GOOGLE_API_KEY is not set in the environment variables.")

# Initialize Gemini model and Assistant
gemini = Gemini(api_key=google_api_key, model="gemini-1.5-flash")
assistant = Assistant(
    llm=gemini,
    description="You help people with their personalized financial goals by analyzing stock data.",
    debug_mode=True,
)

app = FastAPI()

# Enable CORS to allow requests from a React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
async def stock_price_notification_generator():
    while True:
        await asyncio.sleep(10)  # Simulating a 10-second interval for price checks
        # Simulating a random price increase or decrease for notification
        change = random.choice(['increase', 'decrease'])
        yield f"data: Stock price {change} detected\n\n"

@app.get("/notifications/")
async def stock_price_notifications():
    return StreamingResponse(stock_price_notification_generator(), media_type="text/event-stream")
class UserProfile(BaseModel):
    name: str
    financial_goal: str
    risk_tolerance: str
    investment_amount: float
    investment_timeline: str
    ticker_symbol: str
    timespan: str
    limit: int
    notification_threshold: float  # Threshold for notifications (percentage increase or decrease)

def get_historical_stock_data(ticker, timespan='day', limit=30):
    """
    Fetch historical stock price data for a specific ticker symbol from Polygon.io.
    """
    url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/{timespan}/2023-01-01/2023-12-31"
    params = {
        'adjusted': 'true',
        'sort': 'asc',
        'limit': limit,
        'apiKey': polygon_api_key
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get('results', [])
    else:
        raise HTTPException(status_code=500, detail=f"Error fetching stock data: {response.status_code} - {response.text}")

def send_notification(user_name, message):
    """
    Mock function to send a notification.
    Replace this with actual push notification logic (e.g., WebPush or Firebase Cloud Messaging).
    """
    print(f"Notification for {user_name}: {message}")

def monitor_stock_prices(profile: UserProfile):
    """
    Background task that monitors stock prices for significant changes.
    """
    stock_data = get_historical_stock_data(profile.ticker_symbol, profile.timespan, profile.limit)
    
    if stock_data:
        latest_close = stock_data[-1]['c']
        previous_close = stock_data[-2]['c']
        price_change = ((latest_close - previous_close) / previous_close) * 100

        # Check if price change exceeds the notification threshold
        if abs(price_change) >= profile.notification_threshold:
            condition = "increase" if price_change > 0 else "decrease"
            message = f"The price of {profile.ticker_symbol} has had a {condition} of {price_change:.2f}%."
            send_notification(profile.name, message)
            
            # Summarize the condition
            summary = (
                f"**Stock {profile.ticker_symbol} Update:**\n"
                f"The latest close price is ${latest_close:.2f}, which is a {condition} of {price_change:.2f}% "
                f"compared to the previous close price of ${previous_close:.2f}.\n"
            )
            return summary
    return None

@app.post("/get-advice/")
def get_personalized_advice(profile: UserProfile, background_tasks: BackgroundTasks):
    """
    Get personalized financial advice based on user profile and stock data.
    Starts a background task to monitor stock price changes.
    """
    # Fetch stock data
    stock_data = get_historical_stock_data(profile.ticker_symbol, profile.timespan, profile.limit)
    
    if not stock_data:
        raise HTTPException(status_code=404, detail="No stock data found for the given ticker symbol.")
    
    # Start monitoring stock prices in the background
    background_tasks.add_task(monitor_stock_prices, profile)
    
    # Summarize stock data
    total_close = sum([day['c'] for day in stock_data])
    average_close = total_close / len(stock_data)
    highest_high = max(stock_data, key=lambda x: x['h'])
    lowest_low = min(stock_data, key=lambda x: x['l'])
    latest_close = stock_data[-1]['c']
    latest_date = datetime.fromtimestamp(stock_data[-1]['t'] / 1000).strftime('%Y-%m-%d')

    stock_summary = (
        f"**Stock Summary for {profile.ticker_symbol}:**\n"
        f"- **Average Close Price (Last {len(stock_data)} days):** ${average_close:.2f}\n"
        f"- **Latest Close Price (on {latest_date}):** ${latest_close:.2f}\n"
        f"- **Highest High in Period:** ${highest_high['h']:.2f} on {datetime.fromtimestamp(highest_high['t'] / 1000).strftime('%Y-%m-%d')}\n"
        f"- **Lowest Low in Period:** ${lowest_low['l']:.2f} on {datetime.fromtimestamp(lowest_low['t'] / 1000).strftime('%Y-%m-%d')}\n"
    )

    # Construct AI prompt based on user profile and stock data
    prompt = f"""
    You are a personalized assistant for {profile.name}, who wants to {profile.financial_goal}. 
    Here is the recent performance summary for {profile.ticker_symbol}:

    {stock_summary}

    {profile.name}'s financial profile:
    - Investment Goal: {profile.financial_goal}
    - Risk Tolerance: {profile.risk_tolerance}
    - Available to Invest: ${profile.investment_amount}
    - Investment Timeline: {profile.investment_timeline}

    Provide actionable advice based on {profile.name}'s current financial situation and preferences.
    """

    # Generate advice using the Assistant
    advice = assistant.run(prompt, stream=False)

    return {"advice": advice}

# To run the FastAPI app, use this command in your terminal:
# uvicorn main:app --reload
