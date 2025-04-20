from flask import Flask, render_template, request, jsonify
import subprocess
import os
import tempfile

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        return f"Error loading template: {e}", 500

@app.route('/run', methods=['POST'])
def run_code():
    code = request.form['code']
    input_data = request.form['input']
    expected_output = request.form['output']
    lang = request.form['lang']
    result = ''
    with tempfile.TemporaryDirectory() as tempdir:
        if lang == 'java':
            mode = request.form.get('mode', 'single')
            code_file = os.path.join(tempdir, 'Main.java')
            with open(code_file, 'w') as f:
                f.write(code)
            compile_proc = subprocess.run(['javac', code_file], capture_output=True, text=True)
            if compile_proc.returncode != 0:
                return jsonify({'result': 'Compilation Error:\n' + compile_proc.stderr})
            if mode == 'single':
                # Run Java program once per input line
                input_lines = input_data.strip().split('\n')
                aggregated_outputs = []
                for single_input in input_lines:
                    run_proc = subprocess.run(['java', '-cp', tempdir, 'Main'], input=single_input + '\n', capture_output=True, text=True, timeout=2)
                    aggregated_outputs.append(run_proc.stdout.strip())
                actual_output = '\n'.join(aggregated_outputs)
            else:
                # Block mode: run once for all input
                run_proc = subprocess.run(['java', '-cp', tempdir, 'Main'], input=input_data, capture_output=True, text=True, timeout=2)
                actual_output = run_proc.stdout.strip()
        else:
            return jsonify({'result': 'Only Java is supported in this demo.'})
        # Compare output line by line
        expected_lines = expected_output.strip().split('\n')
        actual_lines = actual_output.strip().split('\n')
        max_len = max(len(expected_lines), len(actual_lines))
        feedback = ''
        # Prepare input lines for subcase display
        input_lines = input_data.strip().split('\n')
        for i in range(max_len):
            exp = expected_lines[i] if i < len(expected_lines) else ''
            act = actual_lines[i] if i < len(actual_lines) else ''
            # Normalize whitespace for comparison
            if exp.strip() == act.strip():
                feedback += f'Case {i+1}: Accepted\n'
            else:
                # For each subcase, input consists of two lines: lines 2*i and 2*i+1
                input1 = input_lines[2*i] if 2*i < len(input_lines) else ''
                input2 = input_lines[2*i+1] if 2*i+1 < len(input_lines) else ''
                feedback += f'Case {i+1}: Wrong Answer\n  Input:\n'
                if input1:
                    feedback += f'    {input1}\n'
                if input2:
                    feedback += f'    {input2}\n'
                feedback += f'  Expected: {exp}\n  Actual:   {act}\n'
        return jsonify({'result': feedback})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
