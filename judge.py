import os
import subprocess
import sys
import time

PROBLEMS_DIR = 'problems'
SUBMISSIONS_DIR = 'submissions'
TIME_LIMIT = 2  # seconds


def list_problems():
    return [d for d in os.listdir(PROBLEMS_DIR) if os.path.isdir(os.path.join(PROBLEMS_DIR, d))]

def list_submissions():
    return [f for f in os.listdir(SUBMISSIONS_DIR) if f.endswith('.java')]

def compile_java(java_file):
    compile_cmd = ['javac', java_file]
    try:
        result = subprocess.run(compile_cmd, capture_output=True, text=True, timeout=10)
        if result.returncode != 0:
            return False, result.stderr
        return True, ''
    except subprocess.TimeoutExpired:
        return False, 'Compilation timed out.'

def run_java(class_name, input_path):
    run_cmd = ['java', '-cp', SUBMISSIONS_DIR, class_name]
    try:
        with open(input_path, 'r') as infile:
            start = time.time()
            result = subprocess.run(run_cmd, stdin=infile, capture_output=True, text=True, timeout=TIME_LIMIT)
            elapsed = time.time() - start
        if result.returncode != 0:
            return False, result.stderr, elapsed
        return True, result.stdout, elapsed
    except subprocess.TimeoutExpired:
        return False, 'Time Limit Exceeded', TIME_LIMIT

def judge(problem, submission):
    print(f'Judging {submission} on problem {problem}')
    base_name = os.path.splitext(submission)[0]
    java_file = os.path.join(SUBMISSIONS_DIR, submission)
    ok, msg = compile_java(java_file)
    if not ok:
        print('Compilation Error:')
        print(msg)
        return
    # Find testcases
    testcases = sorted([f for f in os.listdir(os.path.join(PROBLEMS_DIR, problem)) if f.endswith('.in')])
    for case in testcases:
        idx = case[:-3]
        input_path = os.path.join(PROBLEMS_DIR, problem, f'{idx}.in')
        output_path = os.path.join(PROBLEMS_DIR, problem, f'{idx}.out')
        with open(output_path, 'r') as f:
            expected = f.read().strip()
        # Read input lines for this testcase
        with open(input_path, 'r') as f:
            input_lines = [line.rstrip('\n') for line in f.readlines()]
        ok, output, elapsed = run_java(base_name, input_path)
        if not ok:
            print(f'Testcase {idx}: Runtime Error / {output.strip()}')
        else:
            actual = output.strip()
            # Split expected and actual output into lines for subcase checking
            expected_lines = expected.strip().split('\n')
            actual_lines = actual.strip().split('\n')
            max_len = max(len(expected_lines), len(actual_lines))
            all_passed = True
            for i in range(max_len):
                exp = expected_lines[i] if i < len(expected_lines) else ''
                act = actual_lines[i] if i < len(actual_lines) else ''
                # For each subcase, input consists of two lines: lines 2*i and 2*i+1
                input1 = input_lines[2*i] if 2*i < len(input_lines) else ''
                input2 = input_lines[2*i+1] if 2*i+1 < len(input_lines) else ''
                input_pair = f'{input1}\n{input2}' if input2 else input1
                if exp == act:
                    print(f'Testcase {idx} - Subcase {i+1}: Accepted')
                else:
                    print(f'Testcase {idx} - Subcase {i+1}: Wrong Answer')
                    print(f'  Input:')
                    for line in input_pair.split('\n'):
                        print(f'    {line}')
                    print(f'  Expected: {exp}')
                    print(f'  Actual:   {act}')
                    all_passed = False
            if all_passed:
                print(f'Testcase {idx}: Accepted ({elapsed:.2f}s)')
            else:
                print(f'Testcase {idx}: Some subcases failed ({elapsed:.2f}s)')

def main():
    problems = list_problems()
    print('Available problems:')
    for i, p in enumerate(problems):
        print(f'{i+1}. {p}')
    pidx = int(input('Select problem: ')) - 1
    problem = problems[pidx]
    submissions = list_submissions()
    print('Available submissions:')
    for i, s in enumerate(submissions):
        print(f'{i+1}. {s}')
    sidx = int(input('Select submission: ')) - 1
    submission = submissions[sidx]
    judge(problem, submission)

if __name__ == '__main__':
    main()
