from pathlib import Path
from shutil import rmtree
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
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
        "Get the company information, analyst recommendations and news for each company",
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
        "Think deeply about the value of each stock.",
        "Be discerning, you are a skeptical investor focused on maximising growth.",
        "Then rank the companies in order of investment potential, with as much detail about your decision as possible.",
        "Prepare a markdown report with your findings with as much detail as possible.",
    ],
    expected_output="Report in markdown format",
    save_output_to_file=research_analyst_report,
)

investment_lead = Assistant(
    name="Investment Lead",
    llm=Groq(model="llama3-70b-8192", api_key=key),
    description="You are a Senior Investment Analyst for Goldman Sachs tasked with producing a research report for a very important client.",
    instructions=[
        "Review the report provided and produce a final client-worthy report",
    ],
    save_output_to_file=investment_report,
)

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
            description="Review the research report and produce a final summarized and brief report for the client.",
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

        # Read the final investment report
        with open(investment_report, "r") as report_file:
            final_report = report_file.read()

        return {"report": final_report}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the Investment Research Workflow API!"}
