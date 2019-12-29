#!/usr/bin/env python3

# Run 'pip install toml' to install the toml module

import os
import toml
import json

def main():
    file_dir = os.path.dirname(os.path.realpath(__file__))
    team_dir_path = os.path.join("content", "team")
    for execs_dir in filter(os.path.isdir, [os.path.join(team_dir_path,f) for f in os.listdir(team_dir_path)]):
        d = []
        print(execs_dir)
        exec_files = filter(lambda f: f.endswith(".md") and f != "index.md", os.listdir(execs_dir))
        for exec_file in exec_files:
            with open(os.path.join(execs_dir, exec_file), "r") as f:
                lines = f.readlines()
                lines = lines[1:-1]
                front_matter = toml.loads("".join(lines))
                d.append({
                    "name": front_matter["title"],
                    "position": front_matter["position"],
                    "image": front_matter["asset"]["image"],
                    "date": front_matter["date"],
                    "weight": front_matter["weight"],
                })
       
        d.sort(key=lambda x: x["weight"])
        for x in d:
            x.pop("weight", None)

        with open(os.path.join(execs_dir, "execs.json"), "w") as f:
            json.dump(d, f, indent=4)

if __name__ == "__main__":
    main()
