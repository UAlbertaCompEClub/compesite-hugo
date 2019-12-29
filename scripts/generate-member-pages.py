#!/usr/bin/env python3

import os
import argparse
import json
import toml
from datetime import datetime

def dir_path(string):
    if os.path.isdir(string):
        return string
    else:
        raise NotADirectoryError(string)

def parse_args():
    parser = argparse.ArgumentParser(description="Generate member markdown pages from json file")
    parser.add_argument("path", type=dir_path)
    parser.add_argument("--no-delete", dest="delete", action="store_false", help="Don't delete existing member pages")
    return parser.parse_args()

def main():
    args = parse_args()

    os.chdir(args.path)

    if args.delete:
        flist = filter(lambda f: f.endswith(".md") and f != "index.md", os.listdir("."))
        for f in flist:
            os.remove(f)

    with open("execs.json", "r") as f:
        execs_array = json.load(f)
        for index, exec_obj in enumerate(execs_array, start=1):
            parts = [str(index)] + exec_obj["name"].lower().split()
            fname = "-".join(parts) + ".md"
            print(fname)
            date = exec_obj["date"] if "date" in exec_obj else datetime.today().strftime("%Y-%m-%d") 
            front_matter = {
                "title": exec_obj["name"],
                "position": exec_obj["position"],
                "weight": index * 10,
                "date": date,
                "asset": {
                    "image": exec_obj["image"],
                },
            }

            with open(fname, "w") as f:
                contents = "+++\n" + toml.dumps(front_matter) + "+++\n"
                f.write(contents)

if __name__ == "__main__":
    main()
