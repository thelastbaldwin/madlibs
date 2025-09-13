import sys, os, re

def print_headline():
    print("*" * 25)
    print(" " * 9, "MADLIBS", " " * 9, sep='')
    print("*" * 25, end="\n\n")

def tryOpenFile(fn, dir):
    try:
        with open(f"{dir}/{fn}") as f:
            template = f.read()
            return template
        print(f"successfully opened {fn}")
    except OSError as e:
        print(f"Unable to open file {fn}")
        sys.exit(1)

def getFilenameFromList(dir):
    dirlist = os.listdir(dir)
    print("Available Templates: ")
    for index, value in enumerate(dirlist):
        print(f"[{index + 1}] {value}")
    selection = int(input("Selection: ")) - 1
    if selection not in range(0, len(dirlist)):
        print("Invalid selection. Exiting")
        sys.exit(1)
    return dirlist[selection]

def madlib(template):
    tokenRegex = re.compile('{([^}]+)}')
    while True:
        match = re.search(tokenRegex, template)
        if match is None:
            break
        replacement = input("{}: ".format(match.group(1).capitalize()))
        start, end = match.span()
        template = template[:start] + replacement + template[end:]

    print()    
    print(template)

def main(*args):
    template_dir = "../templates"
    print_headline()
    filename = sys.argv[1] if len(sys.argv) == 2 else None
    
    if filename is None:
        filename = getFilenameFromList(template_dir)
    
    template = tryOpenFile(filename, template_dir)
    madlib(template)
    

if __name__ == '__main__':
    main()