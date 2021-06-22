[![DOI](https://zenodo.org/badge/159829943.svg)](https://zenodo.org/badge/latestdoi/159829943)

# CoExp Web Application

CoExp Web Application is a webpage tool developed using the ASP.NET Core Framework and built with the aim of easy the use of the family of [CoExpNets R packages](https://github.com/juanbot/CoExpNets) (author: Juan A. Botía) outside a command-line environment.


## Introduction

R programming language has spread across the scientific community as the preferred way of running statistical and graphical analysis. In a biological-data-analysis context, the likelihood of using an R package noticeably increases when the data to be analyzed presents a genetic nature. However, the usage of the R language raises an important drawback: it requires command-line and coding skills to be able to use it in an effective way. Moreover, the complexity of some R operations and calculations could increase the difficulty in the interpretations of some results, even for expert users. The aim of this document is to explain the basis of the solution proposed to increase the usability of the family of [CoExpNets](https://github.com/juanbot/CoExpNets) R packages (author [Juan A. Botía](https://github.com/juanbot)).


#### Why a web-based user interface?

Due to the huge growth experienced by the Internet and mobile devices during the last decades, it is undeniable that a web-page format is the most well-known and accepted way of browsing the Internet around the world. In this sense, a web-page structure was chosen to make the family of [CoExpNets](https://github.com/juanbot/CoExpNets) R packages easily accessible to every potential user around the world, at any time and from anywhere they decide to do so.

**Please, visit our [WIKI](https://github.com/SoniaRuiz/CoExp_Web/wiki) section for any further information.**


## Getting Started

CoExp Web Application is fully working and can be reached following [this link](https://rytenlab.com/coexp/).

## Built With

* [.NET Core](https://dotnet.microsoft.com) - The web framework used.
* [MVC](https://dotnet.microsoft.com/apps/aspnet/mvc) - The design pattern used.
* [Apache HTTP Server Project](http://httpd.apache.org/) - The webserver chosen.
* [Plumber](https://www.rplumber.io/) - The R package used to create an API to expose CoExp R methods.
* [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-3.0) - Web server natively used by .NET Core web applications.

## Toolkits and Plug-ins used

* [Bootstrap](https://getbootstrap.com/) - To make the website responsible.
* [DataTables](https://datatables.net/) - To display the data in a datatable format.
* [SheetJS](https://sheetjs.com/) - To export data in a *xlsx* format.
* [Underscore](https://underscorejs.org/) - To enhance the JavaScript functionality of the website.
* [Intro.js](https://introjs.com/) - To generate the initial tour through the different pages of the website.
* [D3](https://d3js.org/) - To generate the plot.
* [simTree](https://www.jqueryscript.net/other/Checkable-Hierarchical-Tree.html) - To generate the tree menu.
* [pdfmake](http://pdfmake.org/#/) - To export data in a PDF format.
* The intro video [B Roll provided by Videezy!](https://www.videezy.com/) - The video shown in the home page.

## Docker version

CoExp Web Application is also available in a Docker version. Please, visit [the wiki](https://github.com/SoniaRuiz/coexp-website/wiki) and [this link](https://hub.docker.com/r/soniaruiz/coexp) for further information.

## Authors

* **Sonia García-Ruiz** - *CoExp Web Application UI developer*
  * Get in touch with Sonia García at [s.ruiz@ucl.ac.uk](mailto:s.ruiz@ucl.ac.uk).
* **Juan A. Botía** - *developer of the family of CoExpNets R packages* - [CoExpNets](https://github.com/juanbot/CoExpNets)
  * Get in touch with Juan A. Botía at [j.botia@ucl.ac.uk](mailto:j.botia@ucl.ac.uk).

## Acknowledgments

* All [RytenLab](https://rytenlab.com/RytenLab/Team) members
* [University of Murcia](https://www.um.es/)
* [University College of London](https://www.ucl.ac.uk/)


