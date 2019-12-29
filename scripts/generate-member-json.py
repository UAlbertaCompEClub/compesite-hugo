#!/usr/bin/env python3

import os
import toml
import json
import argparse

def dir_path(string):
    if os.path.isdir(string):
        return string
    else:
        raise NotADirectoryError(string)

def parse_args():
    parser = argparse.ArgumentParser(description="Generate execs json file from member pages")
    parser.add_argument("path", help="Path to member pages", type=dir_path)
    return parser.parse_args()

def main():
    args = parse_args()

    os.chdir(args.path)

    d = []
    exec_files = filter(lambda f: f.endswith(".md") and f != "index.md", os.listdir())
    for exec_file in exec_files:
        with open(exec_file, "r") as f:
            lines = f.readlines()
            lines = lines[1:-1] # Remove "+++\n"
            front_matter = toml.loads("".join(lines))
            d.append({
                "name": front_matter["title"],
                "position": front_matter["position"],
                "image": front_matter["asset"]["image"],
                "weight": front_matter["weight"],
            })
   
    d.sort(key=lambda x: x["weight"])
    for x in d:
        x.pop("weight", None)

    with open("execs.json", "w") as f:
        json.dump(d, f, indent=4)

if __name__ == "__main__":
    main()
