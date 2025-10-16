import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

endpoint = os.environ.get("GITHUB_API_ENDPOINT", "https://models.github.ai/inference")
model = os.environ.get("GITHUB_MODEL", "deepseek/DeepSeek-V3-0324")
token = os.environ.get("GITHUB_MODEL_TOKEN")

if not token:
    raise ValueError("GITHUB_MODEL_TOKEN environment variable is not set. Make sure it's defined in your shell configuration (e.g., ~/.bashrc or ~/.zshrc)")

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

response = client.complete(
    messages=[
        SystemMessage("You are a helpful assistant."),
        UserMessage("Resumen del libro, Confesiones escrito por San Agustín"),
    ],
    temperature=1.0,
    top_p=1.0,
    max_tokens=1000,
    model=model
)

print(response.choices[0].message.content)
