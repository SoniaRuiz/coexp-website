#' @get /getNetworkCategories
#' @post /getNetworkCategories
coexp_api.getNetworkCategories = function(){
  print("getNetworkCategories() requested!")
  getNetworkCategories()
}


#' @get /getAvailableNetworks
#' @post /getAvailableNetworks
#' @json
coexp_api.getAvailableNetworks = function(category){
  print(paste0("getAvailableNetworks() requested! - ", category))
  getAvailableNetworks(category=category)
}

#' @get /getModulesFromTissue
#' @post /getModulesFromTissue
#' @json
coexp_api.getModulesFromTissue = function (tissue="SNIG",which.one="rnaseq",in.cluster=F){
  print(paste0("getModulesFromTissue() requested! - ", which.one, " - ", tissue, " - ", in.cluster))
  getModulesFromTissue(tissue=tissue,which.one=which.one,in.cluster=in.cluster)
}


#' @get /getGOFromTissue
#' @post /getGOFromTissue
#' @json
coexp_api.getGOFromTissue = function(tissue="SNIG",which.one="rnaseq",module=NULL){
  print(paste0("getGOFromTissue() requested! - ", which.one, " - ", tissue, " - ", module))
  getGOFromTissue(tissue=tissue,which.one=which.one,module=module)
}


#' @get /getCellTypeFromTissue
#' @post /getCellTypeFromTissue
#' @json
coexp_api.getCellTypeFromTissue = function (tissue = "SNIG", which.one = "rnaseq", module = NULL){
  print(paste0("getCellTypeFromTissue() requested! - ", which.one, " - ", tissue, " - ", module))
  getCellTypeFromTissue(tissue=tissue,which.one=which.one,module=module)
}


#' @get /getMM
#' @post /getMM
#' @json
coexp_api.getMM = function (tissue = "SNIG", which.one = "rnaseq", module = NULL){
  print(paste0("getMM() requested! - ", which.one, " - ", tissue, " - ", module))
  getMM(which.one=which.one,tissue=tissue, genes=getGenesFromModule(tissue=tissue,which.one=which.one,module=module))
}


#/************************************************************************************/
#/******************************** POST METHODS **************************************/
#/************************************************************************************/

#' @post /getModuleTOMGenes
#' @json
coexp_api.getModuleTOMGenes = function(tissue, which.one, module, topgene){
  print(paste0("getModuleTOMGenes() requested! - ", which.one, " - ", tissue, " - ", module))
  
  tom = getModuleTOM(tissue=tissue,
                     which.one=which.one,
                     module=module,out.path="/home_2/gsit/RLibrary/CoExpToms/")

  if(is.null(tom) | typeof(tom) == "character") return(tom)

  #if(as.integer(ncol(tom)) > 100){
  #      topgenes = 100 + 1
  #}
  print(ncol(tom))
  #topgenes = min(topgenes,ncol(tom))
  #print(topgenes)

  adjs = order(apply(tom,2,sum),decreasing=T) #[1:100]
  tom = tom[adjs,adjs]
  colnames(tom) = CoExpNets::fromAny2GeneName(colnames(tom))
  rownames(tom) = colnames(tom)
  tom = cbind(Gene=rownames(tom),tom)

  print(dim(tom))
  return(rownames(tom))
}

#' @post /getModuleTOMGraph
#' @json
coexp_api.getModuleTOMGraph = function(tissue, which.one, module, topgenes){
  print(paste0("getModuleTOMGraph() requested! - ", which.one, " - ", tissue, " - ", module, " - ", topgenes))

  #tom = getModuleTOMGraph(tissue = tissue, which.one = which.one, module = module, out.path="/home_2/gsit/RLibrary/CoExpToms/", topgenes = topgenes)
  #print(dim(tom))
  #print("Request finished!")


  tom = getModuleTOM(tissue=tissue,
                     which.one=which.one,
                     module=module,out.path="/home_2/gsit/RLibrary/CoExpToms/")

  if(is.null(tom) | typeof(tom) == "character") return(tom)

  if(as.integer(ncol(tom)) > as.integer(topgenes)){
	topgenes = as.integer(topgenes) + 1
  }
  print(ncol(tom))
#  topgenes = min(topgenes,ncol(tom))
  print(topgenes)

  adjs = order(apply(tom,2,sum),decreasing=T)[1:topgenes]
  tom = tom[adjs,adjs]
  colnames(tom) = CoExpNets::fromAny2GeneName(colnames(tom))
  rownames(tom) = colnames(tom)
  tom = cbind(Gene=rownames(tom),tom)

  print(dim(tom))
  return(tom)
}

#' @post /reportOnGenes
#' @json
coexp_api.reportOnGenes = function(tissue, genes, silent = F, which.one = "signedrnaseq", alt.probes = NULL, ens.correction = NULL, gwases = NULL){
  print(paste0("reportOnGenes() requested! - ", which.one, " - ", tissue, " - ", genes))

  if(grepl(", ", genes)){
        genes <- unlist(strsplit(genes, split=", ")[[1]])
  }else if(grepl(",", genes)){
  	genes <- unlist(strsplit(genes, split=",")[[1]])
  }else if(grepl(" ", genes)){
        genes <- unlist(strsplit(genes, split=" ")[[1]])
  }
  else
	genes <- c(genes)
  print(genes)

  reportOnGenes(tissue = tissue, genes = genes, silent = silent, which.one = which.one, alt.probes = alt.probes, ens.correction = ens.correction, gwases = gwases)
}

#' @post /reportOnGenesMultipleTissue
#' @json
coexp_api.reportOnGenesMultipleTissue = function(tissues,genes,silent=F,which.one="signedrnaseq",alt.probes=NULL,out.file=NULL,gwases=NULL){
  print(paste0("reportOnGenesMultipleTissue() requested! - ", which.one, " - ", tissues, " - ", genes))

  if(grepl(", ", genes))
  {
        genes <- unlist(strsplit(genes, split=", ")[[1]])
  }
  else if(grepl(",", genes))
  {
        genes <- unlist(strsplit(genes, split=",")[[1]])
  }
  else if(grepl(" ", genes))
  {
        genes <- unlist(strsplit(genes, split=" ")[[1]])
  }
  else
        genes <- c(genes)

  print(genes)

  if(grepl(",", tissues))
  {
        tissues <- unlist(strsplit(tissues, split=",")[[1]])
  }
  else if(grepl(" ", tissues))
  {
        tissues <- unlist(strsplit(tissues, split=" ")[[1]])
  }
  else
        tissues <- c(tissues)

  print(tissues)

  reportOnGenesMultipleTissue(tissues=tissues,genes=genes,silent=silent,which.one=which.one,alt.probes=alt.probes,out.file=out.file,gwases=gwases)

}


#' @post /globalReportOnGenes
#' @json
coexp_api.globalReportOnGenes = function(categories,tissues,genes){
  print(paste0("globalReportOnGenes() requested! - ", categories, " - ", tissues, " - ", genes))

  if(grepl(", ", genes))
  {
        genes <- unlist(strsplit(genes, split=", ")[[1]])
  }
  else if(grepl(",", genes))
  {
        genes <- unlist(strsplit(genes, split=",")[[1]])
  }
  else if(grepl(" ", genes))
  {
        genes <- unlist(strsplit(genes, split=" ")[[1]])
  }
  else
        genes <- c(genes)

  print(genes)

  if(grepl(",", tissues))
  {
        tissues <- unlist(strsplit(tissues, split=",")[[1]])
  }
  else if(grepl(" ", tissues))
  {
        tissues <- unlist(strsplit(tissues, split=" ")[[1]])
  }
  else
        tissues <- c(tissues)
  print(tissues)

  if(grepl(",", categories))
  {
        categories <- unlist(strsplit(categories, split=",")[[1]])
  }
  else if(grepl(" ", categories))
  {
        categories <- unlist(strsplit(categories, split=" ")[[1]])
  }
  else
        categories <- c(categories)

  print(categories)

  globalReportOnGenes(tissues=tissues,categories=categories,genes=genes)

}
