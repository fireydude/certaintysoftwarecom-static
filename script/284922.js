(function (window, undefined) {

    var forms = {};

    function applyContext(context, func) {
        return function () {
            func.apply(context, arguments);
        };
    }

    function receiveMessage(callback, origin) {
        var interval_id, last_hash, attached_callback;

        if (!window['postMessage']) {
            return; // The browser doesnt support window.postMessage
        }

        if (callback) {
            attached_callback = function (e) {
                if ((typeof origin === 'string' && e.origin !== origin) || (Object.prototype.toString.call(origin) === "[object Function]" && origin(e.origin) === false)) {
                    return !1;
                }
                callback(e);
            };
        }

        window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, false);

    }

    function getForm(identifier) {
        if (!forms[identifier]) {
            forms[identifier] = new PodioWebForm(identifier);
            forms[identifier].initialize();
        }
        return forms[identifier];
    }

    function render(identifier) {
        getForm(identifier).render();
    }

    function configure(identifier, params) {
        var form = getForm(identifier);
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                form[key] = params[key];

                if (key == 'frameUrl') {
                    form['domain'] = params[key].replace(/([^:]+:\/\/[^\/]+).*/, '$1');
                }
            }
        }
        form.setupMessaging();
    }

    // Form object instance
    function PodioWebForm(identifier) {
        this.identifier = identifier;
        this.key = '';
        this.height = '';
        this.frameUrl = '';
        this.domain = '';
        this.iframeId = '';
        this.disabledUrl = '';
        this.allowedDomains = '';
        this.isDisabled = false;
        this.theme = '';

        this.initialize = function () {
            this.key = this.identifier + '' + Math.floor(Math.random() * 1000000);
            this.iframeId = 'podioWebForm' + this.key;
        };

        this.setupMessaging = function () {
            window._podioWebForm.receiveMessage(applyContext(this, this.onFormResize), this.domain);
        };

        this.render = function () {
            this.isDisabled = this.allowedDomains.indexOf(location.host) === -1;

            document.write(this.generateFrameMarkup());
            this.addSnippetStyling();
        };


        this.onFormResize = function (message) {
            if (!message.data) {
                return;
            }

            var msg_components = message.data.split(':');
            if (msg_components.length != 2) {
                return;
            }

            var senderId = msg_components[0];

            if (senderId != this.identifier) {
                return;
            }

            var curHt = parseInt(msg_components[1], 10);
            if (!curHt) {
                return;
            }

            var iframe = document.getElementById(this.iframeId);
            if (window.scrollY > 0) {
                window.scrollTo(0, absOffsetTop(iframe)); // Scroll to iframe unless we are at top of page - then assume page was just loaded
            }
            iframe.style.height = (curHt) + 50 + "px";
        };

        this.generateFrameMarkup = function () {
            return '<iframe class="podio-webform-frame" id="' + this.iframeId + '"' + ' height="' + this.height + '" style="width:100%;border:none;"' + 'allowTransparency="true" frameborder="0" scrolling="no"' + 'src="' + ((this.isDisabled) ? this.disabledUrl + '?domain=' + location.host : this.frameUrl) + '#' + encodeURIComponent(document.location.href) + '"></iframe>';
        };

        this.addSnippetStyling = function () {
            if (document.createElement && document.getElementsByTagName && document.getElementById) {
                var existingStyle = document.getElementById('podio_webform_style');
                if (!existingStyle) {
                    var head = document.getElementsByTagName('head')[0];
                    if (head) {
                        try {
                            var style = document.createElement('style');
                            style.id = 'podio_webform_style';
                            style.type = 'text/css';
                            /*jshint multistr:true */
                            style.innerHTML = "\
                .podio-webform-container, .podio-webform-container a {\
                  font-style:normal !important;\
                  font-weight:normal !important;\
                  font-size:11px !important;\
                  font-family:arial,helvetica,sans-serif !important;\
                  color:#CCC !important;\
                  text-decoration:none !important;\
                }\
                .podio-webform-container {\
                  background: " + (this.theme == 'dark' ? '#333' : '#fff') + " !important;\
                  margin:0 0 5px 0 !important;\
                  padding:0  0 5px 15px !important;\
                  text-align:left !important;\
                }\
                .podio-webform-container a.podio-webform-inner {\
                  margin:0 !important;\
                  padding:0 !important;\
                }\
                .podio-webform-container a.podio-webform-inner:hover {\
                  text-decoration:underline !important;\
                }\
              ";
                            head.appendChild(style);
                        } catch (err) {
                            // This can fail in IE. It's just styling, so just ignore it.
                        }
                    }
                }
            }
        };
    }

    function absOffsetTop(domObject) {
        var selectedPosY = 0;

        while (domObject !== null) {
            selectedPosY += domObject.offsetTop;
            domObject = domObject.offsetParent;
        }

        return selectedPosY;
    }

    // Expose methods
    window._podioWebForm = {
        configure: configure,
        render: render,
        receiveMessage: receiveMessage
    };


})(window);


_podioWebForm.configure(284922, { "height": 485, "frameUrl": "https://podio.com/webforms/3704865/284922?e=true", "disabledUrl": "https://podio.com/webforms/3704865/284922/disabled", "allowedDomains": ["certaintysoftware.com", "certaintysoft.co.uk", "certaintysoftware.com.s3-website-eu-west-1.amazonaws.com", "localhost", "localhost:21204"], "theme": "clean" });