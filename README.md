# About
The Comptuer Engineering Club website is built using [Hugo](https://gohugo.io/), a very powerful and efficient static site generator. The site is based on the [Syna](https://github.com/okkur/syna) theme for Hugo. Our site is deployed on [Netlify](https://www.netlify.com/). 

# Installing Dependencies

## Git
[Install Git](https://git-scm.com/downloads).

## Hugo
The extended edition of Hugo is needed since the website uses SASS for styling.

### Linux

#### Snap

`snap install hugo --channel=extended`

#### Debian/Ubuntu
This command installs the extended edition by default.

`sudo apt-get install hugo`

#### Other

[Check the official installatoin instructions to see if hugo is packaged for your distro](https://gohugo.io/getting-started/installing/#linux). Otherwise, grab the extended hugo binaries from the [Github Releases](https://github.com/gohugoio/hugo/releases).

### Windows
If you are on a Windows machine and use [Chocolatey](https://chocolatey.org/) for package management, you can install Hugo with the following one-liner:

`choco install hugo-extended -confirm`

### OSX

Installing hugo using homebrew is the easiest method. [Visit the Homebrew website for installation instructions](https://brew.sh/). Then, enter the following command to install hugo (extended edition is installed by default):

`brew install hugo`

[Visit the offical Hugo installation instructions for alternative installation methods](https://gohugo.io/getting-started/installing/#macos).


# Clone repo and initalize submodules
First clone the repo:

`git clone https://github.com/UAlbertaCompEClub/compesite-hugo.git && cd compesite-hugo`

Hugo themes are stored in the repo as [submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules), so you will have to initalize all submodules in order to use any themes.

`git submodule update --init --recursive`

# Usage

To start the website, run the following command:

```
$ hugo server -D -F --disableFastRender
```

This command starts a local webserver, usually http://localhost:1313/, and builds all draft pages (-D option), pages with future publish dates (-F), and disables the fast rendered in order to trigger full rebuilds on every change (useful to ensure RSS feeds and json arrays are fully regenerated).

During the development process, if something breaks while you make a change try to first restart the server to see if that fixes it.

# Directory Structure

We're using the standard [directory structure](https://gohugo.io/getting-started/directory-structure/) using content pages.

```
├─ content/
|  └ _global/ # All global fragments are located in this directory
|  └ _index/ # Landing page is in this directory and it's url is changed to **/**.
|  └ about/ # About page
├ layouts/ # You can add extra layout files here. A sample custom fragment is available as a sample.
├ static/ # Your static files are in this directory.
├ themes/ # Hugo uses this directory as a default to look for themes. Syna theme is a git submodule available in this directory.
├ .gitignore
├ .gitmodules
├ config.toml # Hugo config file containing general settings and menu configs.
```

For storing images in the static directory, note that Syna fragments look for
images in their own fragment directory, page directory and `static/images`
directory. Read our [image fallthrough documentation](https://syna.okkur.org/docs/image-fallthrough/) for more info.

Further details read our [full documentation](https://syna.okkur.org/docs).
