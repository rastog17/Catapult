from openai import OpenAI

client = OpenAI()


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