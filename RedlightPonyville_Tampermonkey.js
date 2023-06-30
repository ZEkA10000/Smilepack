// ==UserScript==
// @name         redlightponyville smile plugin
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Make your chatting better!
// @author       Enigan aka ZEkA10000
// @match        https://www.redlightponyville.com/forums/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=redlightponyville.com
// @grant        none
// ==/UserScript==


(function() {
	// <fieldset>
	//	<legend> Name of groupbox</legend>
	//  ..tags..
	// </fieldset>
    'use strict';

	var _is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

       /*
    var script = document.createElement("style")
    script.innerHTML = `#siropuChatContent, .uix_sidebarNav { height:530px !important }`
    document.body.appendChild(script)
    */

    document.getElementsByClassName("p-body-inner")[0].style.height = "max-content"
    document.getElementsByClassName("uix_pageWrapper--fixed")[0].style.overflow = "hidden"
    document.getElementsByClassName("p-pageWrapper")[0].style.marginTop = "0"

    window.setInterval(() => {
        document.getElementsByClassName("uix_pageWrapper--fixed")[0].scrollTo(0, 0);
        document.getElementsByClassName("parallax-mirror")[0].height = "200px";
    }, 10000)

    setTimeout(() => {

		// Remove useless empty space
		let _total_height = 0
		for (var i of $(".uix_sidebar--scroller")[0].children) {
			_total_height += i.clientHeight
		}
		$(".uix_sidebarNav")[0].style.height = _total_height + "px"
		$(".uix_sidebarNav")[0].style.overflow = "hidden"



		// =============================================================================================================
		// FOOTER TOGGLER
		// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

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

		// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
		// FOOTER TOGGLER
		// =============================================================================================================
		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
		// / // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
		// =============================================================================================================
		// BUTTONS
		// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

		// USEFUL FUNCTIONS
		let common_menu_style = "position:absolute; height:0; z-index:9999; transition:0.5s; transition-property:height, top, opacity; visibility:hidden; opacity:0; top:-34px"
		let _set_button_active(_target, _active) {
			_target.disabled = !_active
            _target.style.opacity = 0.5 + (_active ? 0.5 : 0)
		}
		// ENOTE TRIGGER
		let _pluggin_trigger = `<button id="moreEmotes" style="margin-left:16px" data-group-name="moreRich-1" type="button" tabindex="-1" role="button" class="fr-command fr-btn" data-title="More Emotes">
			<!-- Temporary Icon -->
			<img src="https://cdn.discordapp.com/attachments/292754824221687818/1119367900843757668/icon_alphabet.png">
		</button>`
		$(".fr-btn-grp")[2].innerHTML += _pluggin_trigger

        // BOT TRIGGER
        let _bot_trigger = `<button id="z_put_bot" data-group-name="moreRich-1" type="button" tabindex="-1" role="button" class="fr-command fr-btn" data-title="Insert bot">
			<i class="far fa-solid fa-robot" aria-hidden="true"></i>
		</button>
		`
		$(".fr-btn-grp")[2].innerHTML += _bot_trigger

        // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
		// BUTTONS
		// =============================================================================================================
		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
        // / // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
		// =============================================================================================================
		// MENUS
        // v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v
            // =========================================================================================================
		    // EMOTE MENU
            // v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

		// FUNCTION FOR INSERTION EMOTES INTO MENU
		let make_button = (_caption, _link) => {
            let _emoji = document.createElement("img")
            _emoji.title = _caption
            _emoji.src   = _link
			_emoji.setAttribute("style", "display:inline-block; width:32px; height:32px; margin:2px")
            _emoji.onclick = () => {
                $(".fr-element p")[0].innerHTML += "<img alt=\""+ _caption + "\" src=\"" + _link + "\" class=\"fr-fic fr-dii fr-draggable\">"
                $(".fr-wrapper")[0].setAttribute("class", "fr-wrapper")
            }
            $("#smile_list")[0].appendChild(_emoji)
        }

		// EMOTE MENU ITSELF
		let _smile_menu = document.createElement("div")
        _smile_menu.id = "_extra_smile_widget"

		_smile_menu.setAttribute("style", common_menu_style)
		_smile_menu.style.top = "-34px"
		_smile_menu.style.left = $("#moreEmotes")[0].offsetLeft + "px"

        _smile_menu.innerHTML = `
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td style="width:40px; height:32px; padding: 1px;text-align: center;font-size: 20px;" class="block-header"><i class="far fa-smile" aria-hidden="true"></i></td>
				<td style="width:300px; padding: 1px 10px; font-weight:bold" class="block-header">Wellcome to extra smile plugin</td>
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
						<input style="cursor:url(https://cdn.discordapp.com/attachments/292754824221687818/1119378681337483274/magnifyingGlass.png) 8 8, pointer; width:300px; transition:0.5s; margin:5px 8px; background:#222; color:white; border:none; border-bottom:1px solid rgba(255,255,255,0.12)" type="text" id="z_smile_searcher">
					</div>
					<div id="smile_list" style="overflow:hidden; transition:0.5s; border: 1px solid rgba(255,255,255,0.12);background:#2B2B2B; height:0px"></div>
				</td>
			</tr>
		</table>`
		$(".fr-toolbar")[0].appendChild(_smile_menu)

		// TEMPORARY CODE OF SMILE LIST
		let _b_names = ["banana", "mlem", "banana Remastered", "boop", "hugs?", "Mlems you", "Hugs you", "Kiss you", "I'am nervous", "Enigan Approved"]
		let _b_links = ["https://files.everypony.ru/smiles/ca/10/481ded.png", "https://cdn.discordapp.com/emojis/634903117724385282.gif?size=48",
						"https://cdn.discordapp.com/attachments/937794707134763050/1117775299740971068/Banana.png", "https://cdn.discordapp.com/emojis/531964027799207946.webp?size=48",
						"https://cdn.discordapp.com/attachments/910108942447837235/1118996459417763860/11bcc5.png", "https://cdn.discordapp.com/attachments/1037746806550974475/1119022097784647761/6_70.gif",
						"https://cdn.discordapp.com/attachments/292754824221687818/1119024445869281340/6c33ce.png", "https://cdn.discordapp.com/attachments/292754824221687818/1119024445588254760/3_60.gif",
						"https://cdn.discordapp.com/attachments/572463521007403019/1119256216573575208/dad303.png", "https://media.discordapp.net/attachments/1114275540468248627/1118650775120392392/StampZek1.png"]

		for (var i = 0; i < _b_names.length; i++) {
			make_button(_b_names[i], _b_links[i])
		}

		// CLOSE MENU
		let _close_emote_menu = () => {
            $("#smile_categories")[0].style.height = 0
			$("#_extra_smile_widget")[0].style.top = "-34px"
            $("#searcher_container")[0].style.height = 0
            $("#smile_list")[0].style.height = 0
            window.setTimeout(()=>{$("#_extra_smile_widget")[0].style.opacity = 0}, 500)
            window.setTimeout(()=>{$("#_extra_smile_widget")[0].style.visibility = "hidden"}, 1000)
        }
		    // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
		    // EMOTE MENU
		    // =========================================================================================================
		    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
		    // / // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
		    // =========================================================================================================
		    // BOT MENU
		    // v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

		let _bot_menu = document.createElement("div")
        _bot_menu.id = "_bot_list_widget"
		_bot_menu.setAttribute("style", common_menu_style)
        _bot_menu.style.top = "-34px"
		_bot_menu.style.left = $("#z_put_bot")[0].offsetLeft + "px"

        _bot_menu.innerHTML = `
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td style="width:40px; height:32px; padding: 1px;text-align: center;font-size: 20px;" class="block-header"><i class="far fa-solid fa-robot" aria-hidden="true"></i></td>
				<td style="width:100px; padding: 1px 10px; font-weight:bold" class="block-header">Bot list</td>
				<td class="block-header" id="close_plugin_window" style="width:32px; padding: 6px;">
					<svg id="close_b_button" style="display:block" style="width:32px;" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<rect x="1" width="30" height="30" rx="8" fill="#F33"/>
						<line x1="7" y1="6" x2="25" y2="24" stroke="white" stroke-width="3"   />
						<line x2="7" y1="6" x1="25" y2="24" stroke="white" stroke-width="3"   />
					</svg>
				</td>
			</tr>
			<tr>
				<td colspan="3" style="border: 1px solid rgba(255,255,255,0.12);background:#2B2B2B;">
					<div id="z_bot_list" style="transition:0.5s; height:0px; overflow:hidden;"> put bots here ! </div>
				</td>
			</tr>
		</table>`
		$(".fr-toolbar")[0].appendChild(_bot_menu)

        let _close_bot_menu = () => {
            $("#z_bot_list")[0].style.height = "0px"
			$("#_bot_list_widget")[0].style.top = "-34px"
            window.setTimeout(()=>{$("#_bot_list_widget")[0].style.opacity = 0}, 500)
            window.setTimeout(()=>{
				$("#_bot_list_widget")[0].style.visibility = "hidden"
				_set_button_active($("#z_put_bot")[0], true)
			}, 1000)
        }

		let show_bot_menu = ()=> {
			_set_button_active($("#z_put_bot")[0], false)
			_close_emote_menu()

             $("#_bot_list_widget")[0].style.left = $("#z_put_bot")[0].offsetLeft + "px"

            if ($("#z_bot_list")[0].style.height == "300px") {
                _close_bot_menu()
            } else {
                $("#_bot_list_widget")[0].style.visibility = "visible"
                $("#_bot_list_widget")[0].style.opacity = 1

                setTimeout(() => {
					$("#_bot_list_widget")[0].style.top = "-334px"
                    $("#z_bot_list")[0].style.height = "300px"
                }, 300)
                setTimeout(() => {
                    _set_button_active($("#z_put_bot")[0], true)
                }, 600)
            }
        }

		let show_emote_menu = ()=> {
			_close_bot_menu()
			let _height = 300

			$("#_extra_smile_widget")[0].style.left = $("#moreEmotes")[0].offsetLeft + "px"

            if ($("#smile_list")[0].style.height == _height - 32  + "px") {
                _close_emote_menu()
            } else {
                $("#_extra_smile_widget")[0].style.visibility = "visible"
                $("#_extra_smile_widget")[0].style.opacity = 1

                setTimeout(() => {

					$("#_extra_smile_widget")[0].style.top = "-334px"
                    $("#smile_categories")[0].style.height = _height + "px"
                    $("#searcher_container")[0].style.height = "32px"
                    $("#smile_list")[0].style.height = _height - 32  + "px"
                }, 300)
            }
        }

		    // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
		    // BOT MENU
		    // =========================================================================================================
        // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
		// MENUS
        // =============================================================================================================
		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
		// / // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // =============================================================================================================
		// EVENTS
		// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

		$("#siropuChatEditor .button")[0].addEventListener("click", _close_emote_menu)
		$("#z_put_bot")[0].addEventListener("click", show_bot_menu)
		$("#moreEmotes")[0].addEventListener("click", show_emote_menu)
		$("#close_b_button")[0].addEventListener("click", _close_bot_menu)
		$("#close_button")[0].addEventListener("click", _close_emote_menu)
        console.log("Emoji plugin script loaded!")
    }, 1500)

// Your code here...
})();