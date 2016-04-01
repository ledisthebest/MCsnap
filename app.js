if (typeof SCM == 'undefined') {
    SCM = null;
}

var AppClass = function () {
    this.settings = {
        'showNameStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'showSkinStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'showColorStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'smoothRenderStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'showScoreStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'showChatStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'darkThemeStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'musicAutoPlayStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'cellTransStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'ignoreSmallStatus': {
            'value': 1,
            'infs': {
                0: {
                    'name': '[DEFAULT]'
                },
                1: {
                    'name': '[DEFAULT]'
                }
            }
        },
        'musicUrl1': {
            'value': 'https://www.youtube.com/watch?v=d27_0A8j5M0'
        },
        'musicUrl2': {
            'value': 'https://www.youtube.com/watch?v=vnHud5YXR70'
        },
        'musicUrl3': {
            'value': 'https://www.youtube.com/watch?v=1-0-4HqyvXE'
        },
        'musicUrl4': {
            'value': 'https://www.youtube.com/watch?v=IhchfhxvPKI'
        },
        'musicUrl5': {
            'value': 'https://www.youtube.com/watch?v=bQOmKD-sMt8'
        }
    };
};

AppClass.prototype.initGame = function () {
    this.updateInputs();
    this.applySettings();

    this.applyMusicList();

    if (this.getSetting('musicAutoPlayStatus').value == 1) {
        SCM && SCM.play();
    }
};

AppClass.prototype.applyMusicList = function () {
    var self = this;

    var playlist = [];

    for (var i = 1; i <= 5; i++) {
        var name = 'musicUrl' + i;

        var $node = $('*[name=' + name + '].setting-input');

        var val = $node.val();
        val = getYoutubeUrl(val);

        self.setStoredSettingVal(name, val);

        if (val) {
            playlist.push({'title': 'My Music' + i, 'url': val});
        }
    }

    SCM && SCM.loadPlaylist(playlist);
};

AppClass.prototype.updateInputs = function () {
    var self = this;
    $('#applyMusicListBtn').click(function () {
        self.applyMusicList();

        SCM && SCM.play();
    });

    $('#playBtn').click(function () {
        var inputed = $('#nick').val();

        inputed = $.trim(inputed);

        if (!inputed) {
            inputed = 'Agar DDack(' + Math.floor(Math.random() * 1000) + ')';

            $('#nick').val(inputed);
        }

        setNick(inputed);
    });

    $('#spectateBtn').click(function () {
        spectate();
    });

    $('#toggleSettingInputsBar').click(function () {
        $('#settings, #instructions').toggle();
    });

    $('#toggleMusicListInputsBar').click(function () {
        $('#musicList').toggle();
    });

    var settings = this.getSettings();

    for (key in settings) {
        var setting = settings[key];

        this.updateInput(key, setting.value);
    }
};

AppClass.prototype.applySettings = function (settings) {
    var settings = this.getSettings();

    for (key in settings) {
        var setting = settings[key];

        this.applySetting(key, setting.value);
    }
};

AppClass.prototype.updateInput = function (key, val) {
    var self = this;

    var $node = $('*[name=' + key + '].setting-input');

    if ($node.is(':checkbox')) {
        $node.prop('checked', val === 1);
        $node.change(function (event) {
            var $node = $(event.target);

            var name = $node.prop('name');
            var val = $node.prop('checked') == true ? 1 : 0;

            self.changeSettingVal(name, val);
        });
    }
    else {
        val = $.trim(val);

        $node.val(val);
    }
};

AppClass.prototype.applySetting = function (key, val) {
    if (key == 'showSkinStatus') {
        setSkins(val === 1);
    }
    else if (key == 'showNameStatus') {
        setNames(val === 1);
    }
    else if (key == 'showColorStatus') {
        setColors(val === 0);
    }
    else if (key == 'showScoreStatus') {
        setShowMass(val === 1);
    }
    else if (key == 'smoothRenderStatus') {
        setSmooth(val === 1);
    }
    else if (key == 'darkThemeStatus') {
        setDarkTheme(val === 1);
    }
    else if (key == 'ignoreSmallStatus') {
        setIgnoreSmall(val === 1);
    }
    else if (key == 'cellTransStatus') {
        setCellTrans(val === 1);
    }
    else if (key == 'showChatStatus') {
        //setHideChat(val === 0);
    }
    else if (key == 'musicAutoPlayStatus') {
        // NOT.. NOW
    }
};

AppClass.prototype.getStoredSettingVal = function (key) {
    var val = null;

    if (store.enabled) {
        val = store2.get('settings__' + key);
    }

    if (typeof val == 'undefined') {
        val = null;
    }

    return val;
};

AppClass.prototype.setStoredSettingVal = function (key, val) {
    if (store.enabled) {
        store2.set('settings__' + key, val);
    }
};

AppClass.prototype.changeSettingVal = function (key, val) {
    var settings = this.getSettings();

    if (store.enabled) {
        this.setStoredSettingVal(key, val);
    }

    this.applySetting(key, val);
};

AppClass.prototype.getSettings = function () {
    var settings = this.settings;

    if (store.enabled) {
        for (key in settings) {
            var setting = settings[key];

            var settingVal = this.getStoredSettingVal(key);

            if (settingVal !== null) {
                settings[key].value = settingVal;
            }
        }
    }

    return settings;
};

AppClass.prototype.getSetting = function (key) {
    var settings = this.getSettings();

    return settings[key];
};

var getYoutubeUrl = function (url) {
    url = removeAllBlanks(url);

    url = replaceAll(url, 'https://', '');
    url = replaceAll(url, 'http://', '');
    url = replaceAll(url, 'www.youtube', 'youtube');

    var youtubeUrl = '';

    var array = URLToArray(url);

    if (typeof array['v'] != 'undefined' && array['v']) {
        youtubeUrl = 'https://www.youtube.com/watch?v=' + array['v'];
    }

    return youtubeUrl;
};

var replaceAll = function (str1, str2, str3) {
    while (str1.indexOf(str2) > -1) {
        str1 = str1.replace(str2, str3);
    }

    return str1;
};

var removeAllBlanks = function (str) {
    var str2 = str.replace(/\n|\r|\t| /g, "");

    return str2;
};

var URLToArray = function (url) {
    var request = {};

    var pairs = url.substring(url.indexOf('?') + 1).split('&');

    for (var i = 0; i < pairs.length; i++) {
        if (!pairs[i])
            continue;

        var pair = pairs[i].split('=');
        request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return request;
}

var store2 = {
    set: function (key, val, exp) {
        if (!exp) {
            exp = 1000 * 60 * 60;
        }

        store.set(key, {val: val, exp: exp, time: new Date().getTime()})
    },
    get: function (key) {
        var info = store.get(key)
        if (!info) {
            return null
        }
        if (info && typeof info.time == 'undefined') {
            return null
        }

        if (new Date().getTime() - info.time > info.exp) {
            return null
        }
        return info.val;
    }
}

var showMsgModal = function (msg, callback) {
    if (typeof callback == 'string') {
        var tmp = callback;
        callback = function () {
            moveLink(tmp);
        };
    }

    if ($('#alertModal').length == 0 || !$('#alertModal').modal) {
        alert(msg);

        if ($.isFunction(callback)) {
            setTimeout(function () {
                callback();
            }, 500);
        }
    }
    else {
        var loadingMsg = 'LOADING__';
        var modalTittle = '<i class="fa fa-info"></i> 알림';

        if (msg.substr(0, loadingMsg.length) == loadingMsg) {
            var modalId = msg.substr(loadingMsg.length);
            msg = '<div  calss="text-center" id="' + modalId + '"><i class="fa fa-spinner fa-spin"></i> 잠시만 기다려주세요.</div>';
            modalTittle = '로딩중';
        }

        $('#alertModal').find('.modal-title').empty().append(modalTittle);
        $('#alertModal').find('.modal-body').empty().append(msg);
        $('#alertModal').modal('show');

        if ($.isFunction(callback)) {
            $('#alertModal').off('hide.bs.modal');
            $('#alertModal').on('hide.bs.modal', function () {
                setTimeout(function () {
                    callback();
                }, 500);
            });
        }
    }
};
