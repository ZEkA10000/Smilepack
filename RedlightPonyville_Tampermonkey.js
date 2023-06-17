// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.redlightponyville.com/forums/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=redlightponyville.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var script = document.createElement("style")
    script.innerHTML = `#siropuChatContent, .uix_sidebarNav { height:530px !important }`
    document.body.appendChild(script)

    document.getElementsByClassName("uix_pageWrapper--fixed")[0].style.overflow = "hidden"
    document.getElementsByClassName("p-pageWrapper")[0].style.marginTop = "0"

    window.setInterval(() => {
        document.getElementsByClassName("uix_pageWrapper--fixed")[0].scrollTo(0, 0);
        document.getElementsByClassName("parallax-mirror")[0].height = "200px";
    }, 10000)

    setTimeout(() => {
        var button = document.createElement("button")
        button.setAttribute("class", "fr-btn")
        button.setAttribute("id", "footerToggler")
        button.setAttribute("data-title", "Hide Site Footer")
        button.style.backgroundColor = "#0000"
        button.style.border = "none"
        button.style.transition = "0.2s"
        button.style.borderRadius = "4px"
        button.style.height = "32px"
        button.style.marginTop = "2px"


        button.onmouseover = function() {
            button.style.backgroundColor = "#ffffff26"
        }
        button.onmouseleave = function() {
            button.style.backgroundColor = "#0000"
        }

        button.onclick = function() {
            let footerON = "🦶🏻"
            let footerOFF = "🦶🏿"
            let footer = document.getElementById("footer")
            let button = document.getElementById("footerToggler")
            if (footer.style.height != "0px") {
                footer.style.height = "0px"
                footer.style.overflow = "hidden"
                button.innerText = footerOFF
                button.setAttribute("data-title", "Show Site Footer")
            } else {
                footer.style.height = ""
                footer.style.overflow = "inherit"
                button.innerText = footerON
                button.setAttribute("data-title", "Hide Site Footer")
            }
        }
        button.innerText = "🦶🏻"
        document.getElementById("xfBbCode-1").parentNode.appendChild(button)

        //more emotes button |
        // _________________ v
        let _pluggin_trigger = `<button id="moreEmotes" data-group-name="moreRich-1" type="button" tabindex="-1" role="button" class="fr-command fr-btn" data-title="More Emotes">
			<!-- Temporary Icon -->
			<img src="https://cdn.discordapp.com/attachments/292754824221687818/1119367900843757668/icon_alphabet.png">
		</button>
		`

		$(".fr-btn-grp")[2].innerHTML += _pluggin_trigger

        $("#moreEmotes")[0].addEventListener("click", ()=> {
            if ($("#smile_list")[0].style.height == $(".siropuChatUsers")[1].clientHeight - 70  + "px") {
                _close_emote_menu()
            } else {
                $("#_extra_smile_widget")[0].style.visibility = "visible"
                $("#_extra_smile_widget")[0].style.opacity = 1

                window.setTimeout(() => {
                    $("#smile_categories")[0].style.height = $(".siropuChatUsers")[1].clientHeight - 38 + "px"
                    $("#searcher_container")[0].style.height = "32px"
                    $("#smile_list")[0].style.height = $(".siropuChatUsers")[1].clientHeight - 70  + "px"
                }, 300)
            }

        })

        let _close_emote_menu = () => {
            $("#smile_categories")[0].style.height = 0
            $("#searcher_container")[0].style.height = 0
            $("#smile_list")[0].style.height = 0
            window.setTimeout(()=>{$("#_extra_smile_widget")[0].style.opacity = 0}, 500)
            window.setTimeout(()=>{$("#_extra_smile_widget")[0].style.visibility = "hidden"}, 1000)
        }

        let make_button = (_caption, _link) => {
            let _emoji = document.createElement("img")
            _emoji.title = _caption
            _emoji.src   = _link
            _emoji.style.display = "inline-block"
            _emoji.style.width = "32px"
            _emoji.style.height = "32px"
            _emoji.onclick = () => {
                $(".fr-element p")[0].innerHTML += "<img alt=\""+ _caption + "\" src=\"" + _link + "\" class=\"fr-fic fr-dii fr-draggable\">"
                $(".fr-wrapper")[0].setAttribute("class", "fr-wrapper")
            }
            _emoji.style.margin = "2px"
            $("#smile_list")[0].appendChild(_emoji)
        }

        let _smile_menu = document.createElement("div")
        _smile_menu.id = "_extra_smile_widget"
        _smile_menu.style.position = "relative"
        _smile_menu.style.height = "0"
        _smile_menu.style.top = "22px"
        _smile_menu.style.zIndex = "9999"
        _smile_menu.style.transition = "0.5s"
        _smile_menu.style.visibility = "hidden"
        _smile_menu.style.opacity = 0

        _smile_menu.innerHTML = `
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td style="width:32px; height:32px; padding: 1px;text-align: center;font-size: 20px;" class="block-header"><i class="far fa-smile" aria-hidden="true"></i></td>
				<td style="width:416px; padding: 1px 10px; font-weight:bold" class="block-header">Wellcome to extra smile plugin</td>
				<td class="block-header" id="close_plugin_window" style="width:32px; padding: 6px;">
					<svg id="close_button" style="display:block" style="width:32px;" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<rect x="1" width="30" height="30" rx="8" fill="#F33"/>
						<line x1="7" y1="6" x2="25" y2="24" stroke="white" stroke-width="3"   />
						<line x2="7" y1="6" x1="25" y2="24" stroke="white" stroke-width="3"   />
					</svg>
				</td>
			</tr>
			<tr>
				<td rowspan="2"><div id="smile_categories" style="overflow:hidden;transition:0.5s; border: 1px solid rgba(255,255,255,0.12);background:#2B2B2B; height:0px"></div></td>
				<td colspan="2" style="border: 1px solid rgba(255,255,255,0.12);background:#2B2B2B;">
					<div style="transition:0.5s; height:0px; overflow:hidden" id="searcher_container">
						<input style="cursor:url(https://cdn.discordapp.com/attachments/292754824221687818/1119377675476279366/magnifying_glass-0.png) 8 8, pointer; width:432px; transition:0.5s; margin:5px 8px; background:#222; color:white; border:none; border-bottom:1px solid rgba(255,255,255,0.12)" type="text" id="z_smile_searcher">
					</div>
					<div id="smile_list" style="overflow:hidden; transition:0.5s; border: 1px solid rgba(255,255,255,0.12);background:#2B2B2B; height:0px"></div>
				</td>
			</tr>
		</table>`
		$("#siropuChatTabs")[0].appendChild(_smile_menu)
		$("#close_button")[0].addEventListener("click", _close_emote_menu)

let _b_names = ["banana", "mlem", "banana Remastered", "boop", "hugs?", "Mlems you", "Hugs you", "Kiss you", "I'am nervous", "Enigan Approved"]
let _b_links = ["https://files.everypony.ru/smiles/ca/10/481ded.png", "https://cdn.discordapp.com/emojis/634903117724385282.gif?size=48",
                "https://cdn.discordapp.com/attachments/937794707134763050/1117775299740971068/Banana.png", "https://cdn.discordapp.com/emojis/531964027799207946.webp?size=48",
                "https://cdn.discordapp.com/attachments/910108942447837235/1118996459417763860/11bcc5.png", "https://cdn.discordapp.com/attachments/1037746806550974475/1119022097784647761/6_70.gif",
                "https://cdn.discordapp.com/attachments/292754824221687818/1119024445869281340/6c33ce.png", "https://cdn.discordapp.com/attachments/292754824221687818/1119024445588254760/3_60.gif",
                "https://cdn.discordapp.com/attachments/572463521007403019/1119256216573575208/dad303.png", "https://media.discordapp.net/attachments/1114275540468248627/1118650775120392392/StampZek1.png"]


for (var i = 0; i < _b_names.length; i++) {
    make_button(_b_names[i], _b_links[i])
}

console.log("script loaded!")
}, 1500)


// Your code here...
})();