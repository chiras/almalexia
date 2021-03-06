# Almalexia Officer Guide
{:.no_toc}

* TOC list
{:toc}

The general procedure is 
1. **Event creation** with parameter combination
2. **Signups by users**
3. Always perform an **event closing** (this will set the event to inactive and it will not be further screened for reactions)

**IF SOMETHING WENT WRONG IN EVENT CREATION OR YOU WANT TO DELETE AN EVENT, PLEASE DO NOT SIMPLY REMOVE THE MESSAGE**

This may crash the bot, as it currently will still search for the associated message, which does obviously not exist anymore. I will take care of that at some time, but for now: 

**DO NOT DELETE EVENT POSTS OF THE BOT MANUALLY**

Use the ```+delete``` option described below instead.

***
# Event creation

## Where to create events?

The bot is differentiating two different channels for event posting and signups:
* Current channel
* General announcement channel

The idea behind this is that there are usually some separate type of channels on each Discord guild server, serving different purposes, e.g. PvP, Trials, Dungeons, Social...

Thus event creation should thus always happen in these specific channels. By that, events can be themed, resticted to a particular audience... 

The announcement channel will collect all event posts from all channels. It is thus to be regarded as a "collection of events" for members to have an overview over all currently available events, not as the place to create events. Some members may not even be able to signup (see restriction options below), but still can see that there is an event.

Thus, the bot will always create **2** event posts (and you dont want them in the same channel!). Signups for users are possible by reaction to either post.

## Bare minimum syntax

```
+create "Here my event name"
```

This will create an event **Today** at **9pm** with **12 ✅** roles. 
Of course it possible to set these parameters (and more) manually, see below. But this is the bare minimum to successfully create an event.

All events will additionally to signups or roles (see below) receive emojis automatically for 
* ⏰ Late attending (listed under Reserves)
* ❓ Maybe attending (listed under Reserves)
* ❌ Declines

------
## Combining parameter

All the following described parameters can be combined in any order. A full example for an event may thus be for a standard trial event:

```
+create "Here my event name" 2019-12-20 8:15pm 2 :bandage: 2 :shield: 8 :crossed_swords: @trial-group
```

None of these following parameters is mandatory, but you probably do not want only events today and some more adjustments :)

------
## Date and Time

**Setting day by date:**
```
+create "Here my event name" 2019-12-20
```
You have to keep to this format YYYY-MM-DD for the bot to recognize the date as such.

**Setting day by weekday:**
```
+create "Here my event name" thursday
```
This will create an event at the next upcoming thursday.

**Adding a time:**
```
+create "Here my event name" 8:15pm
+create "Here my event name" 8:15am

```
You have to keep to this format h:mm(p/a)m for the bot to recognize the date as such. Add no spaces between the time and the am/pm.


------
## Roles

To overwrite the default **12 ✅** roles assigned to events, roles can be added by listing all wanted roles as emojis alongside their number

```
+create "Here my event name"  2 :bandage: 2 :shield: 8 :crossed_swords: 
```
The syntax is for each: "Number Emoji", be sure that there **one** space between.
You can add as many roles as you want, the above is just a typical trial example. BUT, do not use server-internal emojis, only unicode emotes (see: [Full List](https://unicode.org/emoji/charts/full-emoji-list.html)), and even some of those might not work. If you encounter some emotes that are not working, but such you would like to use, feel free to contact me, I might add them. 

```
+create "Weird event" 2 :shield: 2 :head_bandage: 2 :bow_and_arrow: 2 :fire: 4 :unicorn: 3 :smiley: 9 :flag_ch: 3 :flag_ac: 3 :flag_ae:

```

Would create something like this 

![multi Role setup](https://cdn.discordapp.com/attachments/632545040190668801/632569114296057866/Bildschirmfoto_2019-10-12_um_15.23.21.png)

------
## Signup restriction

Events may be restricted to **one** Discord member role. Only users with this tag will be signup, reactions by all other members are ignored. To do this, just tag the role in your event creation:

```
+create "Here my event name" @trial-group
```


------
## Description/Notes (not implemented, toDo)

Currently there is not option to change the description or the notes, but I intend to add it. No ETA though, sorry!

***
# Event closing

Events will be automatically closed once they are ongoing. Alternatively you can close it before, there may be various reasons to close or cancel events, e.g. signup cap reached, crown got ill, whatever. But most obviously, the date/time of the event has been reached. 

At the bottom of each event post, you will see an event ID. This ID can be used to close events via two different commands:
![event id](https://cdn.discordapp.com/attachments/632545040190668801/632570427855732736/Bildschirmfoto_2019-10-12_um_15.28.48.png)

* **Closing an event**

This will tell the users, "yes, the event is happening, but no more signups are allowed". 

```
+close #1234
```

Emotes are removed, but post remains visible with a note:
![Closed Event](https://cdn.discordapp.com/attachments/632545040190668801/632546241414299658/alma_closed.png)

* **Canceling an event**

This will tell the users, "no, the event is not going to happen". 

```
+cancel #1234
```

Emotes are removed, but post remains visible with a note:
![Canceled Event](https://cdn.discordapp.com/attachments/632545040190668801/632546239329861642/alma_canceled.png)

***
# Event deletion

If something went wrong during event creation, use this command

```
+delete #1234
```

This will remove all posts by the bot from this respective event in your channels. Please do not manually delete messages of the bot for now, I am working on this -- it will currently crash the bot (reliably).
