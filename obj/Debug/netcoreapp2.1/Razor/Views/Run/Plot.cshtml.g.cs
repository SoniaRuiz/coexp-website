#pragma checksum "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Plot.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "13cfba502fcfab29de5bd9b7fe170c42b62ecbc9"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Run_Plot), @"mvc.1.0.view", @"/Views/Run/Plot.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Run/Plot.cshtml", typeof(AspNetCore.Views_Run_Plot))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"13cfba502fcfab29de5bd9b7fe170c42b62ecbc9", @"/Views/Run/Plot.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"999153e3f062e8fedf186436238d7f4cf3822629", @"/Views/_ViewImports.cshtml")]
    public class Views_Run_Plot : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/javascript"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/d3.v3.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/bootstrap-select.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/api.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/net_v2.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("include", "Development", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/api.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/net_v2.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_8 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("include", "Production,Private", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_9 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/xlsx.full.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Plot.cshtml"
  
    ViewData["Title"] = "Plot Gene Network";

#line default
#line hidden
            BeginContext(55, 32, true);
            WriteLiteral("\r\n    <div class=\"breadcrumb\">\r\n");
            EndContext();
#line 7 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Plot.cshtml"
         if (ViewContext.RouteData.Values["controller"].ToString() != "Home")
        {

#line default
#line hidden
            BeginContext(177, 191, true);
            WriteLiteral("            <span class=\"main-label-breadcrumbs\">CoExp</span>\r\n            <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n            <span class=\"active\">Plot Gene Network</span>\r\n");
            EndContext();
#line 12 "\\ad.ucl.ac.uk\home0\skgtsg0\Documents\GitHub\CoExp_Web\Views\Run\Plot.cshtml"
        }
        

#line default
#line hidden
            BeginContext(625, 3014, true);
            WriteLiteral(@"    </div>
<div class=""row"">
    <div class=""col-sm-3 sidebar menu"">
        <h4>Please, make your selection:</h4>
        <hr class=""menu-hr"" />

        <div id=""step1"">
            <label for=""category_dropdown"">Category</label><br />
            <select id=""category_dropdown"" name=""category"" class=""selectpicker"" title=""Select an option ...""></select>
        </div>
        <br>

        <div id=""step2"">
            <label for=""network_dropdown"">Network</label><br />
            <select id=""network_dropdown"" name=""network"" class=""selectpicker"" title=""Select an option ...""></select>
        </div>
        <br>

        <div id=""step3"">
            <label for=""module_dropdown"">Module</label><br />
            <select id=""module_dropdown"" name=""module"" class=""selectpicker"" title=""Select an option ...""></select>
        </div>
        <br>

        <div id=""step4"">
            <label for=""genes-range"">Number of genes</label><br />
            <input id=""genes-range"" type=""range"" min=""");
            WriteLiteral(@"2"" max=""30"" value=""30"">
            <input id=""text-box_genes-range"" type=""text"" value=""30"">
        </div>

        <br>
        <hr class=""menu-hr"" />

        <div id=""step5"">
            <button id=""send_button"" class=""btn btn-primary"">Accept</button>
        </div>
    </div>

    <div id=""step6"" class=""col-md-9"">
        
        <div id=""empty-initial-results"">
            <p>Your results will appear here.</p>
        </div>
        
        <div id=""plot_area"">
            <table id=""network_plot_table"">
                <tr>
                    <td>
                        <div id=""network_plot"" class=""text-center""></div>
                    </td>
                </tr>
            </table>
            <br>
            <div id=""button_area"" class=""pull-right"" style=""margin-right:20px;"">
                <button id=""save_plot"" class=""btn btn-primary"">Save Graph</button>
                <button id=""save_data"" class=""btn btn-primary"">Save Data</button>

            </div>
  ");
            WriteLiteral(@"          <br>
            <table id=""table_treshold"">
                <tbody>
                    <tr>
                        <td><h4>Link threshold</h4>
                            <input id=""slider-range-treshold"" type=""range"">
                            <input id=""threshold_network"" type=""text"" size=""30"" value=""""><br/>
                            <small>The links shown above are over this threshold value</small><br />
                            <div class=""center-block"">
                                <input id=""hide_nodes"" type=""checkbox"" name=""hide_nodes"" class=""plot-checkbox"">
                                <label for=""hide_nodes"">Hide isolated nodes</label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id=""dvjson""></div>
        </div>
    </div>
    <div class=""loading_layer""><!-- loading layer --></div>
</div>
");
            EndContext();
            DefineSection("Scripts", async() => {
                BeginContext(3656, 8, true);
                WriteLiteral("\r\n\r\n    ");
                EndContext();
                BeginContext(3664, 64, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "781de2b985b741caa2a6b320594dd7a7", async() => {
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
                BeginContext(3728, 9, true);
                WriteLiteral("   \r\n    ");
                EndContext();
                BeginContext(3737, 71, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "3a44e5f6e3774bf597d6007a423d525e", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(3808, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(3814, 194, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("environment", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "fd8b8f53df55426eb9216f19705bae80", async() => {
                    BeginContext(3849, 10, true);
                    WriteLiteral("\r\n        ");
                    EndContext();
                    BeginContext(3859, 58, false);
                    __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cfe4495811074338a984bca6a2ad156e", async() => {
                    }
                    );
                    __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                    __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                    await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                    if (!__tagHelperExecutionContext.Output.IsContentModified)
                    {
                        await __tagHelperExecutionContext.SetOutputContentAsync();
                    }
                    Write(__tagHelperExecutionContext.Output);
                    __tagHelperExecutionContext = __tagHelperScopeManager.End();
                    EndContext();
                    BeginContext(3917, 10, true);
                    WriteLiteral("\r\n        ");
                    EndContext();
                    BeginContext(3927, 61, false);
                    __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "be404f29e800487eaf194ef073995f43", async() => {
                    }
                    );
                    __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                    __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                    await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                    if (!__tagHelperExecutionContext.Output.IsContentModified)
                    {
                        await __tagHelperExecutionContext.SetOutputContentAsync();
                    }
                    Write(__tagHelperExecutionContext.Output);
                    __tagHelperExecutionContext = __tagHelperScopeManager.End();
                    EndContext();
                    BeginContext(3988, 6, true);
                    WriteLiteral("\r\n    ");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper.Include = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4008, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(4014, 209, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("environment", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7c33cd6b691a444793aa9cdb354eb69c", async() => {
                    BeginContext(4056, 10, true);
                    WriteLiteral("\r\n        ");
                    EndContext();
                    BeginContext(4066, 62, false);
                    __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bf96fe3e45104df0967d494b8d3b5569", async() => {
                    }
                    );
                    __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                    __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
                    await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                    if (!__tagHelperExecutionContext.Output.IsContentModified)
                    {
                        await __tagHelperExecutionContext.SetOutputContentAsync();
                    }
                    Write(__tagHelperExecutionContext.Output);
                    __tagHelperExecutionContext = __tagHelperScopeManager.End();
                    EndContext();
                    BeginContext(4128, 10, true);
                    WriteLiteral("\r\n        ");
                    EndContext();
                    BeginContext(4138, 65, false);
                    __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "affe933d626c4550b78c7586e533f2b4", async() => {
                    }
                    );
                    __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                    __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                    __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_7);
                    await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                    if (!__tagHelperExecutionContext.Output.IsContentModified)
                    {
                        await __tagHelperExecutionContext.SetOutputContentAsync();
                    }
                    Write(__tagHelperExecutionContext.Output);
                    __tagHelperExecutionContext = __tagHelperScopeManager.End();
                    EndContext();
                    BeginContext(4203, 6, true);
                    WriteLiteral("\r\n    ");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper.Include = (string)__tagHelperAttribute_8.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_8);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4223, 10, true);
                WriteLiteral("\r\n\r\n\r\n    ");
                EndContext();
                BeginContext(4233, 68, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "2bd5bfbf413147dcae2267117a40b44f", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_9);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4301, 3485, true);
                WriteLiteral(@"

    <script type=""text/javascript"">
        $(document).ready(function () {
            // Turn active current menu's option
            $("".nav-item"").find("".active"").removeClass(""active"");
            $(""#tab_plot"").addClass(""active"");

            API.prototype.menuInit(4);

            $(function () {
                $('input').filter(function () { return this.type == 'range' }).each(function () {
                    let $slider = $(this);
                    let $text_box = """";
                    if ($(this)[0].id == ""genes-range"") {
                        $text_box = $('#text-box_genes-range');
                        $text_box.val(this.value);
                    } else {
                        $text_box = $('#threshold_network');
                    }

                    $slider.change(function () {
                        $text_box.val(this.value);
                    });

                    $text_box.change(function () {
                        $slider.val($text_box.");
                WriteLiteral(@"val());
                    });
                });
            });

            $('#empty-initial-results').css(""visibility"", ""visible"");
            startIntro();

        });

        function startIntro() {
            var intro = introJs();
              intro.setOptions({
                steps: [
                  {
                    element: '#step1',
                        intro: ""<div class='customHelpHeader'>Category</div><p>Select here your preferred type of co-expression networks.</p>"",
                        position: 'right',
                
                    tooltipClass: 'customStep1'
                  },
                  {
                    element: '#step2',
                    intro: ""<b>Network</b><br/><br/>Select here your preferred co-expression network."",
                    position: 'right'
                  },
                  {
                    element: '#step3',
                    intro: ""<b>Module</b><br/><br/>Select how you would like to");
                WriteLiteral(@" visualize the results."",
                    position: 'right'
                  },
                  {
                    element: '#step4',
                    intro: ""<b>Number of genes</b><br/><br/>Select how many genes you would like the graph to have."",
                    position: 'right'
                  },
                  {
                    element: '#step5',
                    intro: ""<b>Accept</b><br/><br/>Once you are ready, press 'Accept' to send your query."",
                    position: 'right'
                  },
                  {
                    element: '#step6',
                    intro: ""<b>Results</b><br/><br/>This is the results area. Here will appear all your results."",
                    position: 'bottom'
                  }
                ]
              });

                var doneTourPlot = sessionStorage.getItem('EventTourPlot') === 'Completed';
                if (doneTourPlot) {
                    return;
                }
        ");
                WriteLiteral(@"        else {
                    intro.start();

                    intro.oncomplete(function () {
                        sessionStorage.setItem('EventTourPlot', 'Completed');
                    });

                    intro.onexit(function () {
                        sessionStorage.setItem('EventTourPlot', 'Completed');
                    });
                }

          }
    </script>
");
                EndContext();
            }
            );
            BeginContext(7789, 2, true);
            WriteLiteral("\r\n");
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
