#pragma checksum "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\Run\About.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1511d26c2dd665848d6326384f953f9c6be262e0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Run_About), @"mvc.1.0.view", @"/Views/Run/About.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Run/About.cshtml", typeof(AspNetCore.Views_Run_About))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\_ViewImports.cshtml"
using CoExp_Web;

#line default
#line hidden
#line 2 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\_ViewImports.cshtml"
using CoExp_Web.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1511d26c2dd665848d6326384f953f9c6be262e0", @"/Views/Run/About.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"999153e3f062e8fedf186436238d7f4cf3822629", @"/Views/_ViewImports.cshtml")]
    public class Views_Run_About : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/images/logo-ucl.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("UCL logo"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/images/logo-um.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("UM logo"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\Run\About.cshtml"
  
    ViewData["Title"] = "About";

#line default
#line hidden
            BeginContext(43, 12, true);
            WriteLiteral("\r\n<header>\r\n");
            EndContext();
#line 7 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\Run\About.cshtml"
     if (ViewContext.RouteData.Values["controller"].ToString() != "Home")
    {

#line default
#line hidden
            BeginContext(137, 20, true);
            WriteLiteral("        <b>CoExp</b>");
            EndContext();
#line 9 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\Run\About.cshtml"
                                                                                                                                                               
    }

#line default
#line hidden
            BeginContext(305, 4, true);
            WriteLiteral("    ");
            EndContext();
#line 11 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\Run\About.cshtml"
     if (ViewContext.RouteData.Values["action"].ToString() != "Index")
    {

#line default
#line hidden
            BeginContext(384, 8, true);
            WriteLiteral("        ");
            EndContext();
            BeginContext(394, 2, true);
            WriteLiteral("> ");
            EndContext();
            BeginContext(397, 136, false);
#line 13 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\Run\About.cshtml"
       Write(Html.ActionLink("About CoExp", ViewContext.RouteData.Values["action"].ToString(), ViewContext.RouteData.Values["controller"].ToString()));

#line default
#line hidden
            EndContext();
            BeginContext(533, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 14 "C:\Users\skgtsg0\source\repos\CoExp_Web\CoExp_Web\Views\Run\About.cshtml"
    }

#line default
#line hidden
            BeginContext(542, 2663, true);
            WriteLiteral(@"</header>
<div class=""row"">
    <div class=""col-sm-12"">
        <h2>About</h2>
            
        <div>
            <fieldset>
                <legend>
                    CoExp v1.0.1
                </legend>

                <p>
                    CoExp Web application is a web interface for the effortless usage and management of CoExp R software: a family of R packages which altogether conform a R framework for the generation,
                    deployment, sharing and exploitation of co-expression networks as annotation models of genes and their role in transcription. The family of packages of CoExpNets can be got from the
                    URL (<a href=""https://github.com/juanbot/CoExpNets"" target=""_blank"">https://github.com/juanbot/CoExpNets</a>). Within CoExp Web application, all CoExp models are available and can also 
                    be accessed and used for your own research. <br><br>

                    CoExp Web application has been developed by <a href=""http://www.ryt");
            WriteLiteral(@"enlab.com/RytenLab/MemberInfo?Id=LO96_F34158"" target=""_blank"" title=""Sonia García-Ruiz"">
                        Sonia García</a>, for the Ryten Lab.
                    Sonia is the Web Master, you can reach Sonia, member of the Ryten Lab, at <a href=""mailto:s.ruiz@ucl.ac.uk"">s.ruiz@ucl.ac.uk</a>.<br>
                    The Web is hosted at <a href=""http://www.um.es"" target=""_blank"">University of Murcia</a>.
                    The Web hosting is coordinated by <a href=""http://www.rytenlab.com/RytenLab/MemberInfo?Id=BP98-F74160"" target=""_blank"" title=""Juan A. Botía"">Juan A. Botía</a>,
                    a member of the Ryten Lab, and Professor at University of Murcia.
                    You can reach Prof. Botía at <a href=""mailto:juanbotiablaya@gmail.com"">juanbotiablaya@gmail.com</a>.


                </p>
                <p>
                    <b>Version:</b> CoExp v1.0.1 <br>
                    <b>Authors:</b> <span class=""author""><a href=""http://www.rytenlab.com/RytenLab/MemberInfo?Id=L");
            WriteLiteral(@"O96_F34158"" target=""_blank"" title=""Sonia García-Ruiz"">Sonia García</a></span> and
                    <span class=""author""><a href=""http://www.rytenlab.com/RytenLab/MemberInfo?Id=BP98-F74160"" target=""_blank"" title=""Juan A. Botía"">Juan A. Botía</a></span>
                    <br>
                    <b>RytenLab HomePage:</b> <a href=""http://www.rytenlab.com/"" target=""_blank"">http://www.rytenlab.com/</a>
                </p>
                <br>
                <div>
                    <a href=""https://www.ucl.ac.uk/"" target=""_blank"" title=""Go to University College of London"">
                        ");
            EndContext();
            BeginContext(3205, 50, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "f7ee50467e744e128df514848d878829", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(3255, 126, true);
            WriteLiteral("\r\n                    </a>\r\n                    <a href=\"http://www.um.es\" target=\"_blank\" title=\"Go to University of Murcia\">");
            EndContext();
            BeginContext(3381, 48, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "fc6a6b82fdd246f98cb56a582f9140e4", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(3429, 52, true);
            WriteLiteral("</a>\r\n                </div>\r\n                    \r\n");
            EndContext();
            BeginContext(3583, 67, true);
            WriteLiteral("            </fieldset>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
