from pathlib import Path
from shutil import rmtree
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from phi.llm.groq import Groq
from phi.assistant import Assistant
from phi.workflow import Workflow, Task
from phi.tools.yfinance import YFinanceTools
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Define the API key
key = "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"

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the paths for reports
reports_dir = Path("wip/reports")
if reports_dir.is_dir():
    rmtree(path=reports_dir, ignore_errors=True)
reports_dir.mkdir(parents=True, exist_ok=True)

# Paths for individual reports
stock_analyst_report = str(reports_dir.joinpath("stock_analyst_report.md"))
research_analyst_report = str(reports_dir.joinpath("research_analyst_report.md"))
investment_report = str(reports_dir.joinpath("investment_report.md"))

# Define the workflow assistants
stock_analyst = Assistant(
    name="Stock Analyst",
    llm=Groq(model="llama3-70b-8192", api_key=key),
    tools=[YFinanceTools(company_info=True, analyst_recommendations=True, company_news=True)],
    description="You are a Senior Investment Analyst for Goldman Sachs tasked with producing a research report for a very important client.",
    instructions=[
        "You will be provided with a list of companies to write a report on.",
        "Get the company information, analyst recommendations, and news for each company",
        "Generate an in-depth report for each company in markdown format with all the facts and details.",
        "Note: This is only for educational purposes.",
    ],
    expected_output="Report in markdown format",
    save_output_to_file=stock_analyst_report,
)

research_analyst = Assistant(
    name="Research Analyst",
    llm=Groq(model="llama3-70b-8192", api_key=key),
    description="You are a Senior Investment Analyst for Goldman Sachs tasked with producing a ranked list of companies based on their investment potential.",
    instructions=[
        "You will write a research report based on the information provided by the Stock Analyst.",
        "Rank the companies in order of investment potential, with detailed justifications.",
        "Prepare a markdown report with your findings with as much detail as possible.",
    ],
    expected_output="Report in markdown format",
    save_output_to_file=research_analyst_report,
)

investment_lead = Assistant(
    name="Investment Lead",
    llm=Groq(model="llama3-70b-8192", api_key=key),
    description="You are a Senior Investment Analyst for Goldman Sachs tasked with producing a final research report for a client.",
    instructions=[
        "Review the previous reports and produce a final summarized and brief report for the client.",
    ],
    save_output_to_file=investment_report,
)

# Define the workflow
investment_workflow = Workflow(
    name="Investment Research Workflow",
    tasks=[
        Task(
            description="Collect information about NVDA & TSLA.",
            assistant=stock_analyst,
            show_output=False,
        ),
        Task(
            description="Produce a ranked list based on the information provided by the stock analyst.",
            assistant=research_analyst,
            show_output=False,
        ),
        Task(
            description="Review the research report and produce a final summarized report for the client.",
            assistant=investment_lead,
        ),
    ],
    debug_mode=True,
)

# FastAPI endpoint to start the workflow
@app.post("/run-workflow")
def run_workflow():
    try:
        # Run the investment workflow
        investment_workflow.print_response(markdown=True, stream=False)

        # Read the Stock Analyst report
        with open(stock_analyst_report, "r") as stock_report_file:
            stock_report = stock_report_file.read()

        # Read the Research Analyst report
        with open(research_analyst_report, "r") as research_report_file:
            research_report = research_report_file.read()

        # Read the final Investment Lead report
        with open(investment_report, "r") as final_report_file:
            final_report = final_report_file.read()

        # Prepare structured JSON response
        report_json = {
            "stock_analyst_report": {
                "content": stock_report,
                "sections": {
                    "company_info": "Parsed company information from stock report",  # Example parsing
                    "analyst_recommendations": "Parsed analyst recommendations",
                    "company_news": "Parsed news",
                }
            },
            "research_analyst_report": {
                "content": research_report,
                "sections": {
                    "rankings": "Parsed rankings and reasons",
                    "investment_potential": "Detailed investment potential per stock"
                }
            },
            "final_investment_report": {
                "content": final_report,
                "summary": "Summarized brief report"
            }
        }

        # Return the JSON report to the frontend
        return JSONResponse(content=report_json)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the Investment Research Workflow API!"}
 