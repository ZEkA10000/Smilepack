// ==UserScript==
// @name         redlightponyville smile plugin
// @namespace    http://tampermonkey.net/
// @version      0.3.7
// @description  Make your chatting better! (Recommend screen size: 1920x1080 (Full HD))
// @author       Enigan aka ZEkA10000
// @match        https://www.redlightponyville.com/forums/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=redlightponyville.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    var _is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

    var script = document.createElement("style")
    script.innerHTML = `
    /*#siropuChatContent, .uix_sidebarNav { height:530px !important }*/
    /*.uix_sidebarNav { height:530px !important }*/
    .uix_sidebarNav { height:fit-content !important }
    .uix_stickyBodyElement:not(.offCanvasMenu) { min-height: auto !important }
    .siropuChatMessageActions { font-size:18px }
    .p-body-inner {height: max-content}
    .uix_pageWrapper--fixed {overflow: hidden }
    .p-pageWrapper { margin-top:0 }
    .u-dt[title] { background-color: #0092; text-decoration: underline dotted cornflowerblue; }
    .siropuChatMessageLikes{ color:indianred; display: inline-block }
    .siropuChatMessageLikes::after { content: "❤"; display: inline-block;  white-space: pre; font-size:16px; line-height: 16px; }
    *[data-user-id="13094"][itemprop="name"]::before { content: url( "https://raw.githubusercontent.com/ZEkA10000/Smilepack/main/icons/dev.png" ) }
    #z_bot_list fieldset { border:none; border-top:1px white solid; font-weight: bold}
	#z_bot_list {padding-top:4px}
    @keyframes z_owner_color {
       from, to { color: #F00 }
       16% { color: #FF0 }
       33% { color: #0F0 }
       49% { color: #0FF }
       66% { color: #00F }
       83% { color: #F0F }
    }
    *[data-user-id="13094"][itemprop="name"] { transition: 1s linear; animation: z_owner_color 6s infinite }
	#z_bot_list p {margin: 0; line-height:16px;font-weight: normal;}
	#z_bot_list img {margin-right: 4px;}

    #_bot_list_widget, #_extra_smile_widget {
        position:absolute; height:0; z-index:9999; transition:0.5s; transition-property: height, top, opacity; visibility:hidden; opacity:0; top:-34px; scroll-behavior: smooth
    }

    .emoji_in_menu { display:inline-block; height:40px; margin:2px }
	.emoji_in_mmenu { display:inline-block; height:60px; margin:2px }
    /*.siropuChatDateTime { display:inline !important }
    .siropuChatMessageActions { display:none !important }*/

    .siropuChatMessageRow { transition:0.1s; background:#0000 }
    .siropuChatMessageRow:hover { background:#373A40 }
    #MessageContextMenu a {display:block; cursor: pointer; text-decoration:none; transition: 0.1s}
    #MessageContextMenu a[disabled] { color: #333; text-decoration:line-through }
    #MessageContextMenu a:hover { background:#373A40 }
    #reactContextMenuLike { color:indianred }
    #reactContextMenuQuote, #reactContextMenuCompactQuote { color:#84653d }
    #reactContextMenuLink { color:#408e7d }
    #reactContextMenuEdit { color:#15873F }
    #reactContextMenuReport { color:#dcda54 }
    #reactContextMenuCompactWhisperQuote, #reactContextMenuWhisper { color: #77e }
    #MessageContextMenu { position: fixed; background-color: #2B2B2B;  font-size: 14px; font-weight:bold; border-right: 2px #222 solid; border-left: 2px #454545 solid; z-index: 3; transition: 0.1s; overflow: hidden; transition-property:height, padding, border; }
    `
    document.body.appendChild(script)

    let _MessageActionMenu = document.createElement("div")
    _MessageActionMenu.style.top = "0"
    _MessageActionMenu.id = "MessageContextMenu"
    _MessageActionMenu.style.height = "0px"
    _MessageActionMenu.style.padding = "0px 10px"
	if (_is_mobile) {
		_MessageActionMenu.style.width = "100%"
		_MessageActionMenu.style.fontSize = "24px"
	}
    _MessageActionMenu.style.borderTop = "0px #454545 solid"
    _MessageActionMenu.style.borderBottom = "0px #222 solid"

    _MessageActionMenu.innerHTML = `
        <a id="reactContextMenuLike" data-xf-click="siropu-chat-like"><i class="fa--xf far fa-thumbs-up" aria-hidden="true"></i>&nbsp;Like</a>
        <a id="reactContextMenuQuote" data-xf-click="siropu-chat-quote"><i class="fa--xf far fa-quote-right" aria-hidden="true"></i>&nbsp;Quote</a>
        <a id="reactContextMenuCompactQuote" data-xf-click="siropu-chat-quote"><i class="fa--xf far fa-quote-right" aria-hidden="true"></i>&nbsp;Compact quote</a>
        <a id="reactContextMenuWhisper" data-xf-click="siropu-chat-quote"><i class="fa--xf far fa-quote-right" aria-hidden="true"></i>&nbsp;Whisper</a>
        <a id="reactContextMenuCompactWhisperQuote" data-xf-click="siropu-chat-quote"><i class="fa--xf far fa-quote-right" aria-hidden="true"></i>&nbsp;Whisper + Compact quote</a>
        <a id="reactContextMenuLink" data-xf-click="overlay" data-cache="false"><i class="fa--xf far fa-link" aria-hidden="true"></i>&nbsp;Link</a>
        <a id="reactContextMenuReport" data-xf-click="overlay" data-cache="false"><i class="fa--xf far fa-flag" aria-hidden="true"></i>&nbsp;Report</a>
    `
    document.body.appendChild(_MessageActionMenu)

	if (!_is_mobile) {
		window.setInterval(() => {
			document.getElementsByClassName("uix_pageWrapper--fixed")[0].scrollTo(0, 0);
			document.getElementsByClassName("parallax-mirror")[0].height = "200px";
		}, 10000)
	}

    function switchContext(_show=true) {
        let _target = $("#MessageContextMenu")[0]
        _target.style.height = _show ? "fit-content" : "0px"
        _target.style.padding = (_show ? "10px" : "0px")+ " 10px"

        _target.style.borderTop = (_show ? "2px" : "0px") + " #454545 solid"
        _target.style.borderBottom = (_show ? "2px" : "0px") + " #222 solid"
		if (_is_mobile) {
			_target.style.top = (_show ? _target.clientHeight : window.innerHeight) + "px"
		}
    }

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
		if (_is_mobile) {
			$(".sidePanel__tabPanel")[0].innerHTML += `
				<div class="offCanvasMenu-linkHolder ">
					<div class="p-navEl__inner u-ripple rippleButton">
						<p class="p-navEl__inner u-ripple rippleButton" style="height:20px; padding:0 16px; text-decoration:underline; color:yellowgreen; font-size:16px; margin:0; margin-top:8px">▼ Plugin settings ▼</p>
					</div>
				</div>
				<div class="offCanvasMenu-linkHolder ">
					<div class="p-navEl__inner u-ripple rippleButton" id="z_plugin_nav_menu" style="font-size:14px">
					</div>
				</div>
			`
		} else {
			$(".uix_sidebar--scroller")[0].innerHTML +=`
				<ul class="uix_sidebarNavList">
					<li> <div class="p-navEl__inner u-ripple rippleButton" style="height:20px; padding:0 16px; text-decoration:underline; color:yellowgreen">▼ Plugin settings ▼</div> </li>
					<li> <div class="p-navEl__inner u-ripple rippleButton" id="z_plugin_nav_menu" style="height:42px"></div> </li>
				</ul>
			`
		}
        var button = document.createElement("a")
        button.setAttribute("class", "p-navEl-link")
        button.setAttribute("id", "footerToggler")
        button.setAttribute("data-nav-id", "FooterToggler")
        button.setAttribute("data-title", "Hide Site Footer")

        button.innerHTML = "<span>Toggle Footer </span><img src=\"https://derpicdn.net/img/view/2021/1/5/2524272.png\" title=\"Footer visible\" style=\"height:32px;width:32px; margin-left:10px\">"

        button.onclick = function() {
            //let footerON = "🦶🏻"
            //let footerOFF = "🦶🏿"
            let footer = document.getElementById("footer")
            let button = document.getElementById("footerToggler")
            if (footer.style.height != "0px") {
                footer.style.height = "0px"
                footer.style.overflow = "hidden"
                button.innerHTML = "<span>Toggle Footer </span><img src=\"https://derpicdn.net/img/view/2018/10/11/1854112.png\" title=\"Footer hidden\" style=\"height:32px;width:32px; margin-left:10px\">"
                button.setAttribute("data-title", "Show Site Footer")
            } else {
                footer.style.height = ""
                footer.style.overflow = "inherit"
                button.innerHTML = "<span>Toggle Footer </span><img src=\"https://derpicdn.net/img/view/2021/1/5/2524272.png\" title=\"Footer visible\" style=\"height:32px;width:32px; margin-left:10px\">"
                button.setAttribute("data-title", "Hide Site Footer")
            }
        }
        $("#z_plugin_nav_menu")[0].appendChild(button)
        // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
        // FOOTER TOGGLER
        // =============================================================================================================
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
        // / // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // =============================================================================================================
        // BUTTONS
        // v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

        // USEFUL FUNCTIONS
        let _set_button_active = function(_target, _active) {
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
        //
        // >  =========================================================================================================
        // >  EMOTE MENU
        // >  v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

        let insert_text = function(_text, _space=false) {
            /*
            let _original_text = window.getSelection().focusNode.innerHTML
            if (_original_text == null) _original_text = ""
            let _index = window.getSelection().focusOffset
            console.log(_text)
            window.getSelection().focusNode.innerHTML = _original_text.substr(0, _index) + _text + _original_text.substr(_index) + (_space ? " " : "")
            */
            if ($(".fr-element p")[0].innerHTML == "<br>") $(".fr-element p")[0].innerHTML = ""
            $(".fr-element p")[0].innerHTML += _text
            $(".fr-wrapper")[0].setAttribute("class", "fr-wrapper")
        }
        // FUNCTION FOR INSERTION EMOTES INTO MENU
        let make_button = (_caption, _link) => {
            let _emoji = document.createElement("img")
            _emoji.title = _caption
            _emoji.src   = _link

            _emoji.setAttribute("class", "emoji_in_"+(_is_mobile ? "m" : "")+"menu")
            _emoji.onclick = () => {insert_text("<img alt=\""+ _caption + "\" src=\"" + _link + "\" class=\"fr-fic fr-dii fr-draggable\" style=\"height:48px\">")}
            $("#smile_list")[0].appendChild(_emoji)
        }

        // EMOTE MENU ITSELF
        let _smile_menu = document.createElement("div")
        _smile_menu.id = "_extra_smile_widget"
        _smile_menu.style.top = "-34px"
        _smile_menu.style.left = _is_mobile ? $("#moreEmotes")[0].offsetLeft + "px" : 0

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
					<div id="smile_list" style="overflow-y: scroll; transition:0.5s; border: 1px solid rgba(255,255,255,0.12);background:#2B2B2B; height:0px"></div>
				</td>
			</tr>
		</table>`
		$(".fr-toolbar")[0].appendChild(_smile_menu)

        // TEMPORARY CODE OF SMILE LIST
        let temp_smiles = [
            ["banana",                    "https://files.everypony.ru/smiles/ca/10/481ded.png"],
            ["banana HD",                 "https://cdn.discordapp.com/attachments/937794707134763050/1117775299740971068/Banana.png"],
            ["mlems you",                 "https://cdn.discordapp.com/attachments/1037746806550974475/1119022097784647761/6_70.gif"],
            ["mlems you",                 "https://media.discordapp.net/attachments/292754824221687818/1131928291897507890/15_61.gif"],
            ["mlems you",                 "https://cdn.discordapp.com/emojis/804010001202020442.gif"],
            ["mlem",                      "https://cdn.discordapp.com/emojis/634903117724385282.gif"],
            ["Enigan mlems",              "https://cdn.discordapp.com/attachments/1037836076045320274/1123936235484885082/MlemZ.gif"],
            ["another mlem gif",          "https://media.discordapp.net/attachments/1035190369631084647/1124701857751760966/EntonyMlem.gif"],
            ["boop",                      "https://cdn.discordapp.com/emojis/531964027799207946.webp"],
            ["boops",                     "https://cdn.discordapp.com/emojis/1119601397453836459.gif"],
            ["boops intensive!",          "https://cdn.discordapp.com/emojis/1094839900928479272.gif"],
            ["boop (Enya)",               "https://media.discordapp.net/attachments/292754824221687818/1134040394162786384/EnyaBoop_ORAROAROA_slow.gif"],
            ["boop (Enya)",               "https://media.discordapp.net/attachments/292754824221687818/1134040393747546152/EnyaBoop_ORAROAROA_text_slow.gif"],
            ["boop intensive (Enya)",     "https://media.discordapp.net/attachments/292754824221687818/1134040394884202626/EnyaBoop_ORAROAROA.gif"],
            ["boop intensive (Enya)",     "https://media.discordapp.net/attachments/292754824221687818/1134040394569625630/EnyaBoop_ORAROAROA_text.gif"],
            ["boop (Enigan)",             "https://media.discordapp.net/attachments/292754824221687818/1134040419592851476/ZekBoop_ORAROAROA_slow.gif"],
            ["boop (Enigan)",             "https://media.discordapp.net/attachments/292754824221687818/1134040419118891028/ZekBoop_ORAROAROA_text_slow.gif"],
            ["boop intensive (Enigan)",   "https://media.discordapp.net/attachments/292754824221687818/1134040420620451940/ZekBoop_ORAROAROA.gif"],
            ["boop intensive (Enigan)",   "https://media.discordapp.net/attachments/292754824221687818/1134040420163256432/ZekBoop_ORAROAROA_text.gif"],
            ["boop (Template)",           "https://media.discordapp.net/attachments/292754824221687818/1134056757438726214/TemplateBoop_ORAROAROA_slow.gif"],
            ["boop (Template)",           "https://media.discordapp.net/attachments/292754824221687818/1134056757786857524/TemplateBoop_ORAROAROA_slow_text.gif"],
            ["boop intensive (Template)", "https://media.discordapp.net/attachments/292754824221687818/1134056756436287538/TemplateBoop_ORAROAROA_fast.gif"],
            ["boop intensive (Template)", "https://media.discordapp.net/attachments/292754824221687818/1134056756843139103/TemplateBoop_ORAROAROA_fast_text.gif"],
            ["pat pat",                   "https://cdn.discordapp.com/attachments/910108942447837235/1129716525952147476/petting.gif"],
            ["hugs?",                     "https://cdn.discordapp.com/attachments/910108942447837235/1118996459417763860/11bcc5.png"],
            ["hugs you",                  "https://cdn.discordapp.com/attachments/292754824221687818/1119024445869281340/6c33ce.png"],
            ["hugs you",                  "https://cdn.discordapp.com/attachments/292754824221687818/1130583522445381784/d283e7.png"],
            ["hugs you",                  "https://media.discordapp.net/attachments/910108942447837235/1131901642518839336/01eecb.png"],
            ["hugs you",                  "https://media.discordapp.net/attachments/292754824221687818/1131928291310321845/3_51.gif"],
            ["hugs you",                  "https://media.discordapp.net/attachments/292754824221687818/1131928563608715304/453105.png"],
            ["hugs you both",             "https://media.discordapp.net/attachments/292754824221687818/1131928291612299274/7b3d5c.png"],
            ["kiss you",                  "https://cdn.discordapp.com/attachments/292754824221687818/1119024445588254760/3_60.gif"],
            ["kiss you",                  "https://media.discordapp.net/attachments/292754824221687818/1131928290949595146/3_14.gif"],
            ["I'am nervous",              "https://cdn.discordapp.com/attachments/572463521007403019/1119256216573575208/dad303.png"],
            ["Enigan Approved",           "https://media.discordapp.net/attachments/1114275540468248627/1118650775120392392/StampZek1.png"]
        ]

        for (var img of temp_smiles) {
            make_button(img[0], img[1])
        }


        // >  ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
        // >  EMOTE MENU
        // >  =========================================================================================================
        // >  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // >  / // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
        // >  =========================================================================================================
        // >  BOT MENU
        // >  v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

        let _bot_menu = document.createElement("div")
        _bot_menu.id = "_bot_list_widget"
        _bot_menu.style.top = "-34px"
        _bot_menu.style.left = _is_mobile ? $("#z_put_bot")[0].offsetLeft + "px" : 0

        _bot_menu.innerHTML = `
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td style="width:40px; height:32px; padding: 1px;text-align: center;font-size: 20px;" class="block-header"><i class="far fa-solid fa-robot" aria-hidden="true"></i></td>
				<td style="width:120px; padding: 1px 10px; font-weight:bold" class="block-header">Bot list</td>
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
					<div id="z_bot_list" style="transition:0.5s; height:0px; overflow:scroll;overflow-x:hidden;scroll-behavior: smooth;">
						<fieldset class="z_bot_field"><legend> General Utility Bots</legend></fieldset>
						<fieldset class="z_bot_field"><legend> SFW Content Bots</legend></fieldset>
						<fieldset class="z_bot_field"><legend> NSFW Content Bots</legend></fieldset>
					</div>
				</td>
			</tr>
		</table>`

		$(".fr-toolbar")[0].appendChild(_bot_menu)

        let _bot_menu_list = [
            {
                "Adjbot":     ["adj",     "Insert random adjective"],                "BioBot":     ["users",   "Display bio of random user"],
                "BubbleBot":  ["bubble",  "Pop it!"],                                "BoopBot":    ["yiff",  "Pop it!", function() {
                    let text = `[spoiler="Boop that stress away!"]<br>`
                    for (var y = 0; y < 5; y++) {
                        for (var x = 0; x < 5; x++) {
                            text+= `[ispoiler]<img src="https://raw.githubusercontent.com/ZEkA10000/Smilepack/main/icons/yiff.png">[/ispoiler]`
                        }
                        text +="<br>"
                    }
                    text += "[/spoiler]"
                    insert_text(text ,true)
                }],
                "Magicball":  ["mball",   "Ask anything you want!"],                 "Nounbot":    ["noun",    "Insert random noun"],
                "Rulesbot":   ["rules",   "Display rules of forums"],                "TopicBot":   ["topic",   "Bot, who helps with topic for chat"],
                "Userbot":    ["users",   "Insert random nickname from user list"],  "Verbot":     ["verb",    "Insert random verb"],
                "Random":     ["random",  "Call random bot", function() {
					$(".z_bot_field")[0].children[parseInt(Math.random() * ($(".z_bot_field")[0].children.length-1))].click()
                    switchContext(false)
				}]},
            {
                "Dawwbot":    ["daww",    "Display something cute"],            "Ponybot":    ["users",   "Insert a pony image"],
                "Waifubot":   ["waifu",   "Show to everyone who is your waifu!"],
                "Random":     ["random",  "Send random image", function() {
					$(".z_bot_field")[1].children[parseInt(Math.random() * ($(".z_bot_field")[1].children.length-1))].click()
                    switchContext(false)
				}]},
            {
                "Batbot":     ["bat",     "Send lewd image with bats"],                "Birdbot":    ["feather", "Send lewd image with birds/griffons/hippogriffs"],
                "Bondagebot": ["bondage", "Send lewd image with bondages"],            "Botbot":     ["bot",     "Even robots able to have sex"],
                "Bugbot":     ["bug",     "Send lewd image with changelings"],         "Bunbot":     ["bun",     "Send lewd image with bunnies"],
                "Clopbot":    ["clop",    "Send some lewd image"],                     "Frotbot":    ["frot",    "Send lewd image with touching cocks"],
                "Futabot":    ["futa",    "Send lewd image with futa"],                "Gaybot":     ["gay",     "Send lewd image with gays"],
                "Kinkbot":    ["rnd",     "Send lewd image with kinks"],               "Kirinbot":   ["kirin",   "Send lewd image with kirins"],
                "Lesbot":     ["les",     "Send lewd image with lesbians"],            "Lolibot":    ["loli",    "Send lewd(?) image with lolis"],
                "OCbot":      ["users",   "Send lewd image with OC"],                  "Papi":       ["feather", "Send lewd image with harpy"],
                "Pinupbot":   ["waifu",   "Send something lewd from RLPV Collection"], "Sockbot":    ["socks",   "Send lewd image with socks"],
                "Thiccbot":   ["waifu",   "Extra large and extra lewd!"],              "Watbot":     ["rnd",     "Send something stange"],
                "Yiffbot":    ["yiff",    "Send lewd image with furries"],
                "Random":     ["random",  "Send random lewd image", function() {
                    let _obj = null
                    while (true) {
					    _obj = $(".z_bot_field")[2].children[parseInt(Math.random() * ($(".z_bot_field")[2].children.length-1))]
                        if(_obj.innerText != "Lolibot") break
                    }
                    _obj.click()
                    switchContext(false)
				}]}
        ]
        for (var _bot_category = 0; _bot_category < 3; _bot_category++) {
            for (var c in _bot_menu_list[_bot_category]) {
                let _bot_details = _bot_menu_list[_bot_category][c]
                let _div = document.createElement("div")
                _div.innerHTML = "<p><img style=\"display:inline-block\" src=\"https://raw.githubusercontent.com/ZEkA10000/Smilepack/main/icons/" + _bot_details[0] + ".png\">"+ c + "</p>"
                if (c == "Random" || c == "BoopBot") {
                    _div.onclick = _bot_details[2]
                } else {
					let _bot_img_template = ["<img alt=\"Plugin used\" class=\"fr-fic fr-dii fr-draggable\" style=\"width:16px\" src=\"https://raw.githubusercontent.com/ZEkA10000/Smilepack/main/icons/", ".png\">"]
					let _temp_prepare_ = _bot_img_template[0] + _bot_details[0] + _bot_img_template[1] + "<strong><u>" + c + "</u></strong>" + _bot_img_template[0] + _bot_details[0] + _bot_img_template[1]
                    _div.onclick = () => {insert_text( _temp_prepare_ ,true) }
                }
                $(".z_bot_field")[_bot_category].appendChild(_div)
            }
        }

        let _close_bot_menu = () => {
            $("#z_bot_list")[0].style.height = "0px"
            $("#_bot_list_widget")[0].style.top = "-34px"
            window.setTimeout(()=>{$("#_bot_list_widget")[0].style.opacity = 0}, 500)
            window.setTimeout(()=>{
                $("#_bot_list_widget")[0].style.visibility = "hidden"
                _set_button_active($("#z_put_bot")[0], true)
            }, 800)
        }

        // CLOSE MENU
        let _close_emote_menu = () => {
            $("#smile_categories")[0].style.height = 0
            $("#_extra_smile_widget")[0].style.top = "-34px"
            $("#searcher_container")[0].style.height = 0
            $("#smile_list")[0].style.height = 0
            window.setTimeout(()=>{$("#_extra_smile_widget")[0].style.opacity = 0}, 500)
            window.setTimeout(()=>{
                $("#_extra_smile_widget")[0].style.visibility = "hidden"
                _set_button_active($("#moreEmotes")[0], true)
            }, 800)
        }

        let show_bot_menu = ()=> {
            _set_button_active($("#z_put_bot")[0], false)
            _close_emote_menu()
            switchContext(false)
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
                setTimeout(() => { _set_button_active($("#z_put_bot")[0], true) }, 600)
            }
        }

        let show_emote_menu = ()=> {
            _set_button_active($("#moreEmotes")[0], false)
            _close_bot_menu()
            switchContext(false)
            let _height = 300
            $("#_extra_smile_widget")[0].style.left = $("#moreEmotes")[0].offsetLeft + "px"
            if ($("#smile_list")[0].style.height == _height - 32 + "px") {
                _close_emote_menu()
            } else {
                $("#_extra_smile_widget")[0].style.visibility = "visible"
                $("#_extra_smile_widget")[0].style.opacity = 1
                setTimeout(() => {
                    $("#_extra_smile_widget")[0].style.top = "-334px"
                    $("#smile_categories")[0].style.height = _height + "px"
                    $("#searcher_container")[0].style.height = "32px"
                    $("#smile_list")[0].style.height = _height - 32 + "px"
                }, 300)
                setTimeout(() => { _set_button_active($("#moreEmotes")[0], true) }, 600)
            }
        }

        // >  ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
        // >  BOT MENU
        // >  =========================================================================================================
        //
        // ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
        // MENUS
        // =============================================================================================================
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
        // / // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // =============================================================================================================
        // EVENTS
        // v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

        try {
            $("#siropuChatEditor .button")[0].addEventListener("click", _close_emote_menu)
            $("#siropuChatEditor .button")[0].addEventListener("click", _close_bot_menu)
        }catch {""}

        $("#z_put_bot")[0].addEventListener("click", show_bot_menu)
        $("#moreEmotes")[0].addEventListener("click", show_emote_menu)
        $("#close_b_button")[0].addEventListener("click", _close_bot_menu)
        $("#close_button")[0].addEventListener("click", _close_emote_menu)
        console.log("Emoji plugin script loaded!")

        let get_username = function(message_element) {
            let _target = message_element
            let _username = null
            let _nickname_color = null
            let _name = ""
            if (_target.getElementsByClassName("username")[0] == undefined) {
                try {
                    _username = _target.getElementsByTagName("b")[0].children[0] //Any bot
                    _nickname_color = getComputedStyle(_username).color
                    _name = _username.innerText
                } catch {
                    _username = _target.getElementsByClassName("siropuChatMessageContentLeft")[0].childNodes[2] //Bot bot
                    _nickname_color = "rgb(255, 255, 255)"
                    _name = _username.textContent.replaceAll("\n", "").replaceAll("\t", "").replaceAll(":", "")
                }
            } else {
                if (_target.getElementsByClassName("username")[0].getElementsByTagName("span")[0]==undefined) {
                    _username = _target.getElementsByClassName("username")[0]
                } else {
                    _username = _target.getElementsByClassName("username")[0].getElementsByTagName("span")[0]
                }
                _nickname_color = getComputedStyle(_username).color
                _name = _username.innerText
            }
            return { name: _name, color: _nickname_color }
        }

        $("#reactContextMenuCompactQuote")[0].onclick = function(_event) {
            let _target = $("li[data-id=" + _event.target.parentNode.getAttribute("data-id") + "]")[0]
            let _user_info = get_username(_target)
            let _nickname_color = _user_info.color
            let _name = _user_info.name

            let _result = "[quote]<span style=\"color:#75BFFF\">Reply to </span><a href=\"http://www.redlightponyville.com/forums/chat/message/"+_event.target.parentNode.getAttribute("data-id")+"/view\" target=\"_blank\" rel=\"noopener noreferrer\"><span style=\"color:"+_nickname_color+"\"><strong>"+_name+"</strong></span></a><span style=\"color:#75BFFF\">: </span>"
            for (var _mesElem of _target.getElementsByClassName("bbWrapper")[0].childNodes) {
                console.log(_mesElem)
                if (_mesElem.className == "bbCodeSpoiler") {
                    _result += "<br>[spoiler=\"" + _mesElem.getElementsByClassName("bbCodeSpoiler-button-title")[0].innerText + "\"]<br>"
                    _result += _mesElem.getElementsByClassName("bbCodeBlock-content")[0].innerHTML + "<br>"
                    _result += "[/spoiler]<br>"
                } else {
                    if (_mesElem.nodeName == "#text") {
                        _result += _mesElem.textContent //+ (_mesElem.nextSibling != null  && _mesElem.nextSibling.tagName == "B" ? "" : "<br>")
                    } else {
                        _result += _mesElem.outerHTML// + (["B", "I"].includes(_mesElem.tagName)  ? "" : "<br>")
                    }
                }
            }
            _result += "[/quote]<br>"
            console.log(_result)
            insert_text(_result)
            switchContext(false)
        }

        var insert_whisper = function(_event, add_quote = false) {
            let _target = $("li[data-id=" + _event.target.parentNode.getAttribute("data-id") + "]")[0]
            let _user_info = get_username(_target)
            let _name = _user_info.name
            let _text = "/whisper ["+_name+"] "
            insert_text(_text)
            if (add_quote) $("#reactContextMenuCompactQuote")[0].click()
        }

        document.body.addEventListener("click", function(_event) {
            console.log(_event.target.id)
            console.log(_event.target.className)

            if (_event.target.id == "MessageContextMenu") {
                _close_bot_menu()
                _close_emote_menu()
            }
            else if (_event.target.className.includes("emoji_in_menu") ||
                     _event.target.id == "z_smile_searcher" ||
                     _event.target == $(".z_bot_field legend")[0] ||
                     _event.target == $(".z_bot_field legend")[1] ||
                     _event.target == $(".z_bot_field legend")[2]) {
                switchContext(false)
            } else {
                switchContext(false)
                _close_bot_menu()
                _close_emote_menu()

            }
        })
        document.body.oncontextmenu = function(event) {
            _close_bot_menu()
            _close_emote_menu()
            let _target = event.target
            while (true) {
                let _targetTag = _target.tagName
                switch (_targetTag) {
                    case "LI":
                        console.log("LI Found!");
                        break;
                    case "UL":
                    case "BODY":
                        console.log("LI not found!");
                        break;
                    default:
                        _target = _target.parentNode
                }
                if (["LI", "UL", "BODY"].includes(_targetTag)) {
                    break;
                }
            }

            console.log(_target);
            if (_target.tagName == "LI" && !_target.parentElement.className.includes("siropuChatUsers") && !_target.parentElement.className.includes("uix_sidebarNavList")) {
                $("#MessageContextMenu")[0].setAttribute("data-id", _target.getAttribute("data-id"))
                if (!_is_mobile) {
					$("#MessageContextMenu")[0].style.left = event.clientX-5+"px"
					$("#MessageContextMenu")[0].style.top = event.clientY-5+"px"
				}
                switchContext(true)
                let _baseUri = "/forums/chat/message/" + _target.getAttribute("data-id")

                let _disableOption = (_id) => {
                    $("#MessageContextMenu a")[_id].setAttribute("disabled", "")
                    $("#MessageContextMenu a")[_id].onclick = function() { switchContext(false) }
                }
                let _id_for_default_actions = {
                    "Like": 0,
                    "Unlike": 0,
					"Edit": 0,
                    "Quote": 1,
                    "Link": 5,
                    "Report": 6
                }
                for (var _i in _id_for_default_actions) {
                    _disableOption(_id_for_default_actions[_i])
                }
                _disableOption(3) ; _disableOption(4) ;
                for (var _react of _target.getElementsByClassName("siropuChatMessageActions")[0].getElementsByTagName("a")) {
                    let el_id = _id_for_default_actions[_react.title]
                    switch (_react.title) {
                        case "Like":
                            $("#MessageContextMenu a")[el_id].innerHTML = "<i class=\"fa--xf far fa-thumbs-up\" aria-hidden=\"true\"></i>&nbsp;Like"
							$("#MessageContextMenu a")[el_id].id = "reactContextMenuLike"
                            $("#MessageContextMenu a")[el_id].removeAttribute("disabled")
                            $("#MessageContextMenu a")[el_id].onclick = function() { _target.getElementsByClassName("siropuChatMessageActions")[0].getElementsByTagName("a")[0].click(); switchContext(false)}
                            break;
                        case "Unlike":
                            $("#MessageContextMenu a")[el_id].innerHTML = "<i class=\"fa--xf far fa-thumbs-down\" aria-hidden=\"true\"></i>&nbsp;Unlike"
							$("#MessageContextMenu a")[el_id].id = "reactContextMenuLike"
                            $("#MessageContextMenu a")[el_id].removeAttribute("disabled")
                            $("#MessageContextMenu a")[el_id].onclick = function() { _target.getElementsByClassName("siropuChatMessageActions")[0].getElementsByTagName("a")[0].click(); switchContext(false)}
                            break;
                        case "Edit":
                            $("#MessageContextMenu a")[el_id].innerHTML = "<i class=\"fa--xf far fa-edit\" aria-hidden=\"true\"></i>&nbsp;Edit"
							$("#MessageContextMenu a")[el_id].id = "reactContextMenuEdit"
                            $("#MessageContextMenu a")[el_id].removeAttribute("disabled")
							$("reactContextMenuCompactWhisperQuote")[0].addAttribute("disabled", "")
							$("reactContextMenuWhisper")[0].addAttribute("disabled", "")
                            $("#MessageContextMenu a")[el_id].onclick = function() { _target.getElementsByClassName("siropuChatMessageActions")[0].getElementsByTagName("a")[2].click(); switchContext(false)}
                            break;
                        case "Quote":
                            $("#MessageContextMenu a")[el_id].setAttribute("href", _baseUri + "/quote")
                            $("#MessageContextMenu a")[el_id].removeAttribute("disabled")
                            $("#MessageContextMenu a")[3].removeAttribute("disabled")
                            $("#MessageContextMenu a")[4].removeAttribute("disabled")
                            $("#reactContextMenuWhisper")[0].onclick = function(_event) { insert_whisper(_event, false) }
                            $("#reactContextMenuCompactWhisperQuote")[0].onclick = function(_event) { insert_whisper(_event, true) }
                            break;
                        case "Link":
                            $("#MessageContextMenu a")[el_id].setAttribute("href", _baseUri + "/link")
                            $("#MessageContextMenu a")[el_id].removeAttribute("disabled")
                            break;
                        case "Report":
                            $("#MessageContextMenu a")[el_id].setAttribute("href", _baseUri + "/report")
                            $("#MessageContextMenu a")[el_id].removeAttribute("disabled")
                            break;
                    }
                }
            } else {
              switchContext(false);
            }
            return false;
        }
    }, 1700)

    // Your code here...
})();