/**
 * Created by shao on 15-1-28.
 */
App
    .directive("zlselectize", function ($rootScope) {
        return {
            restrict: "AE",
            templateUrl: "share/tpl/directives/zlselectize.html",
            scope: {
                receiverlist : "="
            },
            link: function (scope, element, attrs) {
                var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

                var selectto = element.children(0);
                var select = selectto.selectize({
                    persist: false,
                    maxItems: null,
                    valueField: 'email',
                    labelField: 'name',
                    searchField: ['name', 'email'],
                    options: [
                        {email: 'brian@thirdroute.com', name: 'Brian Reavis'},
                        {email: 'nikola@tesla.com', name: 'Nikola Tesla'},
                        {email: 'someone@gmail.com'}
                    ],
                    render: {
                        item: function(item, escape) {
                            return '<div>' +
                                (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                                (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                                '</div>';
                        },
                        option: function(item, escape) {
                            var label = item.name || item.email;
                            var caption = item.name ? item.email : null;
                            return '<div>' +
                                '<span class="label">' + escape(label) + '</span>' +
                                (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                                '</div>';
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
                            return {
                                email : match[2],
                                name  : $.trim(match[1])
                            };
                        }
                        alert('无效邮箱地址');
                        return false;
                    }
                }});

                select.getSelected();
            }
        }
    })

