# Offline Java Judge

## Usage
### Judge CLI

1. Place each problem in its own folder under `problems/`, with testcases as `1.in`, `1.out`, `2.in`, `2.out`, etc.
2. Place user Java submissions in `submissions/` (e.g., `Main.java`).
3. Run the judge:

```bash
python3 judge.py
```

Follow prompts to select a problem and submission.

### Judge Web

#### 1. Install and set up environment

```bash
# (Optional but recommended) Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies (if any are added to requirements.txt)
pip install -r requirements.txt
```

#### 2. Prepare your problems and submissions
- Place each problem in its own folder under `problems/`, with testcases as `1.in`, `1.out`, `2.in`, `2.out`, etc.
- Place user Java submissions in `submissions/` (e.g., `Main.java`).

#### 3. Run the web judge

```bash
python3 app.py
```

The web interface will start. Open your browser and follow the instructions to select a problem and submission for judging.

## Requirements
- Python 3.x
- Java (javac, java) in PATH

## Structure
```
simple-offline-judge/
├── judge.py
├── app.py
├── problems/
│   └── sample_problem/
│       ├── 1.in
│       ├── 1.out
│       └── ...
├── submissions/
│   └── Main.java
├── static/
├── templates/
```
