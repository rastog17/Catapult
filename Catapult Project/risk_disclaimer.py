import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_disclaimer(summary):

    prompt = f"""
Explain risks of this clinical trial simply.
Include disclaimer: Not medical advice.

Trial info:
{summary}
"""

    res = client.chat.completions.create(
        model="gpt-4.1",
        messages=[{"role": "user", "content": prompt}]
    )

    return res.choices[0].message.content

if __name__ == "__main__":
    test_summary = "Trial testing a new diabetes medication in adults."
    result = generate_disclaimer(test_summary)

    print("\n=== GENERATED DISCLAIMER ===\n")
    print(result)
