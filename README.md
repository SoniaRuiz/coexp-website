# CoExp_Web

CoExp Website is a web tool developed in .NET Core Framework, for the easy usage of [CoExp R suit-of-packages](https://github.com/juanbot/CoExpNets) (author: [Juan A. Botía](https://github.com/juanbot/)) - a framework for the generation, deployment, sharing and exploitation of co-expression networks as annotation models of genes and their role in transcription. 


## Introduction

R programming language has spread across the scientific community as the preferred way of running statistical and graphical analysis. In a biological-data-analysis context, the likelihood of using an R package noticeably increases when the data to be analyzed presents a genetic nature. However, the usage of the R language raises an important drawback: it requires command-line and coding skills to be able to use it in an effective way. Moreover, the complexity of some R operations and calculations could increase the difficulty in the interpretations of some results, even for expert users. The aim of this document is to explain the basis of the solution proposed to increase the usability of [CoExp R suite-of-packages](https://github.com/juanbot/CoExpNets) ([Juan A. Botía](https://github.com/juanbot)).


#### Why a web-based user interface?

Due to the huge growth experienced by the Internet and mobile devices during the last decades, it is undeniable that a web-page format is the most well-known and accepted way of browsing the Internet around the world. In this sense, a web-page structure was chosen to make [CoExp R suite-of-packages](https://github.com/juanbot/CoExpNets) easily accessible to every potential user around the world, at any time and from anywhere they decide to do so.

**Please, visit our [WIKI](https://github.com/SoniaRuiz/CoExp_Web/wiki) section for any further information.**


## Getting Started

CoExp Website is fully working and can be reached following [this link](https://snca.atica.um.es/coexp/).

## Built With

* [.NET Core](https://dotnet.microsoft.com) - The web framework used.
* [MVC](https://dotnet.microsoft.com/apps/aspnet/mvc) - The design pattern used.
* [Apache HTTP Server Project](http://httpd.apache.org/) - The webserver chosen.
* [Plumber](https://www.rplumber.io/) - The R package used to create an API to expose CoExp R methods.
* [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-3.0) - Web server natively used by .NET Core web applications.

## Toolkits and Plug-ins used

* [Bootstrap](https://getbootstrap.com/) - To make the webpage responsible.
* [DataTables](https://datatables.net/) - To display the data in a datatable format.
* [SheetJS](https://sheetjs.com/) - To export data in a *xlsx* format.
* [Underscore](https://underscorejs.org/) - To enhance the JavaScript functionality of the webpage.
* [Intro.js](https://introjs.com/) - To generate the initial tour through the different options of the webpage.
* [D3](https://d3js.org/) - To generate the plot.
* [simTree](https://www.jqueryscript.net/other/Checkable-Hierarchical-Tree.html) - To generate the tree menu.
* [pdfmake](http://pdfmake.org/#/) - To export data in a PDF format.

## Docker version

CoExp Webpage is also available in a Docker version. Please, visit [this link](https://hub.docker.com/r/soniaruiz/coexp) for further information.

## Authors

* **Sonia García-Ruiz** - *CoExp Website UI developer*
  * Get in touch with Sonia García at [s.ruiz@ucl.ac.uk](mailto:s.ruiz@ucl.ac.uk).
* **Juan A. Botía** - *CoExp R suit-of-packages developer* - [CoExp R suit-of-packages](https://github.com/juanbot/CoExpNets)
  * Get in touch with Juan A. Botía at [j.botia@ucl.ac.uk](mailto:j.botia@ucl.ac.uk).

## Acknowledgments

* All [RytenLab](https://snca.atica.um.es/RytenLab/Team) members
* [University of Murcia](https://www.um.es/)
* [University College of London](https://www.ucl.ac.uk/)
