# Alignment coding challenge

## Introduction
This project is a simple DNA sequence alignment web application. Users can submit any DNA sequence(consisting of 'A','T','G' and 'C's), and the 
application will parse over the protein sequences in a provided list of assemblies to find an alignment. Details of the alignments 
are displayed. A history of queries that have been submitted is maintained.

The list of assemblies across which to conduct searches are NC_000852, NC_007346, NC_008724, NC_009899, NC_014637, NC_020104, NC_023423, 
NC_016072, NC_023719, and NC_027867.

Note that NC_023640 was in the 'provided list' in the challenge requirements. However, NC_023640 has been obsoleted, and replaced by NC_016072.

## Implementation Notes
1. The back-end has been written in Java 8 with SpringBoot, and the front-end is in Angular 9. 
2. Build and deploy can be easily done using Docker and Docker Compose. 
3. Data for each of assemblies in the 'provided list' were obtained from the corresponding NCBI Nucleotide site. <br>
E.g. For NC_027867, I navigated to https://www.ncbi.nlm.nih.gov/nuccore/NC_027867. I clicked on the 'Send to' link in the
top right area, and downloaded a feature file for the Coding Sequences (in FASTA Nucleotide format).

## Installation and Deploy
Download the code in this Github repo to a location on your machine. 

#### With Docker 
The only requirement for this mode is that Docker and Docker Compose be installed on your machine. 
1. Start Docker
2. In a command line terminal, navigate to the root of the project (which contains the docker-compose.yml file)
3. If you are building the project for the first time (or want to rebuild), type <br>
 ````docker-compose up --build```` <br>
 If you already have a build, simply type <br>
 ````docker-compose up```` <br>
 4. In a browser, navigate to **http://localhost:9898** to bring up the web application interface.
 
 #### Without Docker
 1. Install Java 8, Angular 9, and npm on your machine.
 2. In a command line terminal, navigate to the alignment-ui directory. Type the following <br>
 ```` > npm install```` <br>
 ```` > ng serve```` <br>
 This serves up the front-end.
 3. The Java project is in the alignment-service directory. You can open it in an IDE of your choice, and do a 
 'maven clean install'. Run the main class which is imaginatively named Application.java. (There are command line 
 means to do this too.). This starts the back-end.
 4. In a browser, navigate to **http://localhost:4200** to bring up the web application interface.
 
 ## Guide to the Application
 ![Screenshot](/images/screenshot.jpg)
 
 
