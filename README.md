# 🤖🏁🏆 NASCAR Chatbot - AIM Certification Challenge

NASCAR celebrates a multitude of racing events across North America, with thousands of different guests on each race. Racing teams invite VIP guests to their team pits to enjoy the race; these VIPs are usually representatives of sponsors or other celebrities that might have a commercial interest in the race, but are not, generally speaking, well versed in the rules, regulations, history or race details of NASCAR, making their VIP experience sometimes not worth the time of the race, or not as pleasant as it could be.

We aim to create a NASCAR educational chatbot for VIP guests that can be consulted during the day of the race, at the track, to enhance their experience and increase the ROI of their sponsorship experience.

## API

```
cd api
uv sync
```

## Frontend

```
cd frontend
npm i
npm run dev
```

## Deliverables

### Task 1. Defining your problem and audience

NASCAR celebrates a multitude of racing events across North America, with thousands of different guests on each race. Racing teams invite VIP guests to their team pits to enjoy the race; these VIPs are usually representatives of sponsors or other celebrities that might have a commercial interest in the race, but are not, generally speaking, well versed in the rules, regulations, history or race details of NASCAR, making their VIP experience sometimes not worth the time of the race, or not as pleasant as it could be.

We aim to create a NASCAR educational chatbot for VIP guests that can be consulted during the day of the race, at the track, to enhance their experience and increase the ROI of their sponsorship experience.

### Task 2. Propose a solution

The solution presented is a simple agent that combines the power of RAG with access to tools.

We have an LLM none that, if needed, can query the web (Tavily) for more up-to-date information, or can look up internal documents that have been chunked and added to a vector database.

We've also created a notebook (under `api/sandbox.ipynb`) that evaluates the accuracy, tool calling and topic relevance of our agent.

### Task 3. Dealing with the data

Our data is composed of a small corpus of PDF documents that contain the latest NASCAR rules, as well as the schedule for the 2025 season.

When more up-to-date data is needed (eg. fetch the winner of the latest race), it can also use Tavily to search the web.

### Task 4. RAG prototype

See video attached:

<video width="320" height="240" controls>
  <source src="./nascar-bot.mp4" type="video/mp4">
</video>

### Task 5. Test the agent using RAG evaluation methods

See `api/sandbox.ipynb` to check the different the different test criteria.