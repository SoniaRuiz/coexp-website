#pragma checksum "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Help.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "23254803dc6d44f374ab266e840c563e53f30ef4"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Run_Help), @"mvc.1.0.view", @"/Views/Run/Help.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Run/Help.cshtml", typeof(AspNetCore.Views_Run_Help))]
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
#line 1 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\_ViewImports.cshtml"
using CoExp_Web;

#line default
#line hidden
#line 2 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\_ViewImports.cshtml"
using CoExp_Web.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"23254803dc6d44f374ab266e840c563e53f30ef4", @"/Views/Run/Help.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"999153e3f062e8fedf186436238d7f4cf3822629", @"/Views/_ViewImports.cshtml")]
    public class Views_Run_Help : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-area", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-controller", "Run", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Help_Introduction", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Help_Catalog", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Help_Annotation", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Help.cshtml"
  
    ViewData["Title"] = "Help";

#line default
#line hidden
            BeginContext(42, 26, true);
            WriteLiteral("<div class=\"breadcrumb\">\r\n");
            EndContext();
#line 6 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Help.cshtml"
     if (ViewContext.RouteData.Values["controller"].ToString() != "Home")
    {

#line default
#line hidden
            BeginContext(150, 166, true);
            WriteLiteral("        <span class=\"main-label-breadcrumbs\">CoExp</span>\r\n        <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n        <span class=\"active\">Help</span>\r\n");
            EndContext();
#line 11 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Help.cshtml"
                                                                                                                                                   
    }
    

#line default
#line hidden
            BeginContext(757, 2056, true);
            WriteLiteral(@"</div>
<div class=""row"">
    <div class=""col-sm-11 about"">
        <h2>Getting started with CoExp WebPage application</h2>
        <small>Created: April 04, 2019<br />Last updated: November 22, 2019</small>
        <p class=""author"">
            by <a href=""http://www.rytenlab.com/RytenLab/MemberInfo?Id=BP98-F74160"" target=""_blank"" title=""Juan A. Botía"">Juan A. Botía</a> and
            <a href=""http://www.rytenlab.com/RytenLab/MemberInfo?Id=LO96_F34158"" target=""_blank"" title=""Sonia García-Ruiz"">Sonia García-Ruiz</a>
        </p>
        <hr class=""menu-hr"" />
        <div>
            <p>
                CoExp WebPage is a webpage tool developed in .NET Core Framework, for the easy use of <a href=""https://github.com/juanbot/CoExpNets"" target=""_blank"" title=""CoExp R suite-of-packages available on GitHub"">CoExp R suit-of-packages</a> (author: Juan A. Botía) - a framework for the generation, deployment,
                sharing and exploitation of co-expression networks as annotation models of genes");
            WriteLiteral(@" and their role in transcription.
                <br /><br />
                In order to increase the ease-of-use of CoExp R suit-of-packages, we built a web-based UI because it is undeniable that a web-page format is
                the most well-known and accepted way of browsing the Internet around the world. In this sense, we believe that a web-page structure will make CoExp's networks
                easily accessible to every potential user around the world, at any time and from anywhere they decide to do so. Thus, all CoExp R suit-of-packages' models
                are available and ready-to-use within CoExp WebPage application, and <b>can be accessed and used for your own research</b>.
                <br /><br />
                Finally, the main purpose of this page is to provide a detailed tutorial about how to effectively use the UI of the CoExp Webpage. This tutorial has been divided into
                three main sections, which are detailed below.
            </p>

            <b");
            WriteLiteral("r /><h4>");
            EndContext();
            BeginContext(2813, 83, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4a31510274224bea8d1ab64314cc8e22", async() => {
                BeginContext(2880, 12, true);
                WriteLiteral("INTRODUCTION");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(2896, 227, true);
            WriteLiteral("</h4><br />\r\n            <p>\r\n                This is the \"Getting Started\" tutorial. It contains the details of the use-of-case that we are going to use throughout  the whole series.\r\n            </p>\r\n\r\n            <br /><h4>");
            EndContext();
            BeginContext(3123, 81, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "3e288c1173534571923b20309426653e", async() => {
                BeginContext(3185, 15, true);
                WriteLiteral("NETWORK CATALOG");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_3.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(3204, 200, true);
            WriteLiteral("</h4><br />\r\n            <p>\r\n                This is the second tutorial of the series. It contains information about how to use the \'Network Catalog\' tab.\r\n            </p>\r\n\r\n            <br /><h4>");
            EndContext();
            BeginContext(3404, 88, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "43a2fef19563477fb636ec9ae1632881", async() => {
                BeginContext(3469, 19, true);
                WriteLiteral("GENE SET ANNOTATION");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(3492, 221, true);
            WriteLiteral("</h4><br />\r\n            <p>\r\n                This is the third tutorial of the series. It contains information about how to use the \'Gene Set Annotation\' tab.\r\n            </p>\r\n\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
            EndContext();
            DefineSection("Scripts", async() => {
                BeginContext(3730, 257, true);
                WriteLiteral(@"

    <script type=""text/javascript"">
    $(document).ready(function () {
        // Turn active current menu's option
        $("".nav-item"").find("".active"").removeClass(""active"");
        $(""#tab_help"").addClass(""active"");
    });

    </script>
");
                EndContext();
            }
            );
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
