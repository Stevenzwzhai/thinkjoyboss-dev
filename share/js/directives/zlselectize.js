/**
 * Created by shao on 15-1-28.
 */
App
    .directive("zlselectize", function ($rootScope, $localStorage) {
        return {
            restrict: "AE",
            templateUrl: "share/tpl/directives/zlselectize.html",
            scope: {
                receiverList : "="
            },
            link: function (scope, element, attrs) {
                Array.prototype.unique = function()
                {
                    var a = []; var l = this.length;
                    for (var i = 0; i < l; i++)
                    {
                        for (var j = i + 1; j < l; j++)
                        {
                            if (this[i] === this[j]) j = ++i;
                        }
                        a.push(this[i]);
                    }
                    return a;
                };

                if ($localStorage.mail_contacts == null) {
                    $localStorage.mail_contacts = [];
                }

                var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

                var selectto = element.children(0);

                var contacts = [];
                for (i = 0; i < $localStorage.mail_contacts.length; ++i) {
                    contacts.push({email: $localStorage.mail_contacts[i]});
                }


                var $select = selectto.selectize({
                    plugins: ["remove_button"],
                    persist: true,
                    maxItems: null,
                    valueField: 'email',
                    labelField: 'name',
                    searchField: ['name', 'email'],
                    options: contacts,
                    render: {
                        item: function (item, escape) {
                            return '<div>' +
                                (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                                (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                                '</div>';
                        },
                        option: function (item, escape) {
                            var label = item.name || item.email;
                            var caption = item.name ? item.email : null;
                            return '<div>' +
                                '<span class="label" style="color: #000000">' + escape(label) + '</span>' +
                                (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                                '</div>';
                        }
                    }
                    ,
                    createFilter: function(input) {
                        var match, regex;

                        // email@address.com
                        regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                        match = input.match(regex);
                        if (match) return !this.options.hasOwnProperty(match[0]);

                        // name <email@address.com>
                        regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                        match = input.match(regex);
                        if (match) return !this.options.hasOwnProperty(match[2]);

                        return false;
                    },
                    create: function(input) {
                        if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                            return {email: input};
                        }
                        var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                        if (match) {
                            if ($localStorage.mail_contacts == null) {
                                $localStorage.mail_contacts = [];
                            }
                            $localStorage.mail_contacts = $localStorage.mail_contacts.push(email);

                            return {
                                email : match[2],
                                name  : $.trim(match[1])
                            };
                        }
                        alert('无效邮箱地址');
                        return false;
                    },
                    onChange: function(data) {
                        scope.receiverList = data;
                        scope.$apply();

                        $localStorage.mail_contacts = $localStorage.mail_contacts.concat(data).unique();
                    }
                });
            }
        }
    })

