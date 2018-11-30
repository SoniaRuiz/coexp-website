using CoExp_Web.Adapters;
using CoExp_Web.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoExp_Web.Repositories
{
    public class CoExpRepository
    {
        private HttpAdapter _adapter;
        private string _coexpURL;

        public CoExpRepository()
        {
            _adapter = new HttpAdapter();
            //TODO: cambiar por la URL de la API correcta!!!!!
            _coexpURL = "http://snca.atica.um.es/coexpapi/";
        }
        public string GetNetworkFromTissue(CoexpModel coexpdata)
        {
            _coexpURL = _coexpURL + "getNetworkFromTissue?tissue=" + coexpdata.Tissue
                + "&which.one=" + coexpdata.WhichOne + "&only.file=" + coexpdata.OnlyFile;
            var response = _adapter.HttpRequestJSON(_coexpURL);
            JObject json = JObject.Parse(response);

            coexpdata.ModuleLabels = (json["moduleLabels"]).ToList();
            coexpdata.ModuleColors = (json["moduleColors"]).ToList();

            return response;
        }
    }
}