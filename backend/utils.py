import re

MAX_VOCAB_SIZE = 10000
MAX_SEQUENCE_LENGTH = 300

def clean_text(text: str) -> str:
    """Clean IMDb movie review text by lowercasing, stripping HTML tags, and removing punctuation."""
    if not text:
        return ""
    # Lowercase
    text = text.lower()
    # Remove HTML line breaks & tags
    text = re.sub(r'<br\s*/?>', ' ', text)
    text = re.sub(r'<[^>]+>', '', text)
    # Remove punctuation
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    # Strip whitespace
    return text.strip()

def pad_sequences(sequences, maxlen=300):
    """Pad sequence to fixed maximum length of 300 words."""
    padded = []
    for seq in sequences:
        if len(seq) >= maxlen:
            padded.append(seq[:maxlen])
        else:
            padded.append([0] * (maxlen - len(seq)) + seq)
    return padded
