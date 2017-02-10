$(document).ready(function() {
    console.log("Loading bloomberg.js version 0.0.1");
    $(document).on('playerLoaded', function(e, player) {
        var vidType = '';
        var meta = '';
        $('.meta').html();
        console.log("playerLoaded");

        // If there's metadata associated with the asset, display it in the page
        console.log(player);

        if (!player.metadata) {
            vidType = 'vc';
            meta = '<div class="video-name">' + player.mediainfo.name + '</div><div class="video-description">' + player.mediainfo.description + '</div>';
            console.log(meta);

            // If the player is configured for social links, display in page
            if (typeof player.socialSettings != 'undefined') {
                var services = player.socialSettings.services;
                var svcStr = '';

                // Iterate the social linking services and build the link for each
                if (typeof services != 'undefined') {
                    for (var service in services) {
                        svcStr += getSocialLink(service, services[service], player);
                    }
                }
                // Add social links to the DOM
                if (svcStr != '') {
                    meta += '<div class="vjs-social-overlay"><div class="vjs-social-share-links">' + svcStr + '</div></div>';
                }
            }
            $('.meta').html(meta);
        }
        else {

            // If we don't have a VC video but there's mediainfo data associated, display that instead
            vidType = 'perform';
            meta = '<div class="video-name">' + player.metadata.name + '</div><div class="video-description">' + player.metadata.description + '</div>';
            $('.meta').html(meta);
        }

    });
});

/**
 * Helper to build the html for a social link
 * @param key
 * @param val
 * @param player
 * @returns {string}
 */
function buildInfoCard(player, playerId) {
    // If there's metadata associated with the asset, display it in the page
    console.log("buildInfoCard for " + playerId);
    console.log(player);

    console.log(Object.keys(playerInfoCard).indexOf(playerId) !== -1);

    // If I have player info below, use it for metadata. 
    if (Object.keys(playerInfoCard).indexOf(playerId) !== -1) {
        console.log(playerInfoCard[playerId]);
        var playerInfo = playerInfoCard[playerId];
        vidType = 'perform';
        meta = '<div class="video-name"><H1>' + playerInfo.name + '</H1></div><div class="video-description">' + playerInfo.description + '</div>';
        $('.meta').html(meta);

    }
    else if (!player.metadata) {
        vidType = 'vc';
        meta = '<div class="video-name"><H1>' + player.mediainfo.name + '</H1></div><div class="video-description">' + player.mediainfo.description + '</div>';
        console.log(meta);

        // If the player is configured for social links, display in page
        if (typeof player.socialSettings != 'undefined') {
            var services = player.socialSettings.services;
            var svcStr = '';

            // Iterate the social linking services and build the link for each
            if (typeof services != 'undefined') {
                for (var service in services) {
                    svcStr += getSocialLink(service, services[service], player);
                }
            }
            // Add social links to the DOM
            if (svcStr != '') {
                meta += '<div class="vjs-social-overlay"><div class="vjs-social-share-links">' + svcStr + '</div></div>';
            }
        }
        $('.meta').html(meta);
    }
    else {

        // If we don't have a VC video but there's mediainfo data associated, display that instead
        vidType = 'perform';
        meta = '<div class="video-name"><H1>' + player.metadata.name + '</H1></div><div class="video-description">' + player.metadata.description + '</div>';
        $('.meta').html(meta);
    }
}

/**
 * Helper to build the html for a social link
 * @param key
 * @param val
 * @param player
 * @returns {string}
 */
function getSocialLink(key, val, player) {
    var str = '';
    if (val == true) {
        switch(key) {
            case 'facebook':
                str = '<a href="https://www.facebook.com/sharer/sharer.php?u='+ document.location +'&amp;title='+ player.mediainfo.name +'" ' +
                    'class="vjs-social-share-link vjs-icon-facebook" aria-role="link" aria-label="Share on Facebook" tabindex="1" title="Facebook" target="_blank">' +
                    '<span class="vjs-control-text">Facebook</span> </a>';
                break;
            case 'twitter':
                str = '<a href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&amp;text='+ player.mediainfo.name +'&amp;tw_p=tweetbutton&amp;url='+ document.location +'" class="vjs-social-share-link vjs-icon-twitter" aria-role="link" aria-label="Share on Twitter" tabindex="4" title="Twitter" target="_blank"><span class="vjs-control-text">Twitter</span></a>';
                break;
            case 'linkedin':
                str = '<a href="https://www.linkedin.com/shareArticle?mini=true&amp;url='+ document.location +'&amp;title='+ player.mediainfo.name +'&amp;summary='+ player.mediainfo.description +'&amp;source=Classic" ' +
                    'class="vjs-social-share-link vjs-icon-linkedin" aria-role="link" aria-label="Share on LinkedIn" tabindex="3" title="LinkedIn" target="_blank">' +
                    '<span class="vjs-control-text">LinkedIn</span></a>';
                break;
            case 'google':
                str = '<a href="https://plus.google.com/share?url='+ document.location +'" class="vjs-social-share-link vjs-icon-gplus" aria-role="link" aria-label="Share on Google Plus" tabindex="2" title="Google+" target="_blank">' +
                    '<span class="vjs-control-text">Google+</span></a>';
                break;
        }
        return str;
    }
    return '';
}

var playerInfoCard = {
    "livePlayerId" : {name: 'Live Player with Ad Cues',
        description: 'This player takes a live feed from Bloomberg.com that has embedded cue points.' +
        'The player plays back the feed, pausing when it detects an embedded ad, ' +
        'plays the ad then resumes content playback. The useAdCues functionality is built ' +
        'into the Perform player and is turned on by a simple configuration option.'
    },

    "personalPlayerId" : {name: 'Personalization Player',
        description: 'This player calls into the Bloomberg personalization service to get a ' +
        'personalized list of video. It then calls the Bloomberg video service to get the video ' +
        'metadata. It builds a playlist based on the videos collected and plays the videos  ' +
        'in the playlist back sequentially. After playing the last video it loops back to the first one. ' +
        'The player uses the standard IMA3 plugin but it uses a custom adMacroReplacement function ' +
        'to populate the ad tag with meta data returned by the Bloomberg video service function.' +
        'For more information on advertising with the Brightcove player click ' +
        '<a href="https://docs.brightcove.com/en/perform/brightcove-player/guides/ima-plugin.html">here</a>.'
    },

    "scrubberPlayerId" : {name: 'Thumbnail Scrubber (Sprites) Player',
        description: 'This player uses a thumbnail scrubber plugin to dynamically pop up thumbnail ' +
        'images or sprites, when the user mouses over the scroll bar. for more information ' +
        ' about the thumbnail plugin click <a target="_blank" href="http://docs.brightcove.com/en/video-cloud/brightcove-player/guides/thumbnails-plugin.html">here</a>.'
    },
    "featurePlayerId" : {name: 'Feature Player',
        description: 'This player is configured with IMA3, Moat (with Bloombergs account ID) and Google ' +
        'Analytics (also with Bloombergs account ID). There is not much to see her as all the ' +
        'functionality happens under the hood. The most significant value of this player is to ' +
        'showcase how easy it is to add and configure plugins in the Perform player. ' +
        'For more information on the Perform player click <a target="_blank" href="https://support.brightcove.com/en/perform">here</a> ' +
        ' and for more information on plugins click <a target="_blank" href="https://docs.brightcove.com/en/perform/brightcove-player/guides/plugin-guide.html">here</a>.'
    },


};