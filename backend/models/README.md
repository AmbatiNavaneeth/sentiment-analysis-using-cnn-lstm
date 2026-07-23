# Model Artifacts Directory

Place your trained Keras model and tokenizer pickle files here for production deployment:

- `sentiment_model.keras` - Saved Keras CNN-LSTM model trained on 50,000 IMDb reviews.
- `tokenizer.pkl` - Pickled Keras Tokenizer (fitted on 10,000 vocabulary size).

The `model_loader.py` script automatically loads these files during server startup on Render or local execution.
