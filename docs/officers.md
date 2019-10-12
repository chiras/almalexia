# Almalexia Officer Guide
{:.no_toc}

* TOC list
{:toc}

The general procedure is 
1. **Event creation** with parameter combination
2. **Signups by users**
3. Always perform an **event closing** (this will set the event to inactive and will not be further screened for reactions)

**IF SOMETHING WENT WRONG IN EVENT CREATION OR YOU WANT TO DELETE AN EVENT, PLEASE DO NOT SIMPLY REMOVE THE MESSAGE**

This may crash the bot, as it currently will still search for the associated message, which does obviously not exist anymore. I will take care of that at some time, but for now: **DO NOT DELETE EVENT POSTS OF THE BOT MANUALLY**
Use the ```+delete``` option described below instead.

# Event creation

## Bare minimum syntax

```
+create "Here my event name"
```

This will create an event **Today** at **9pm** with **12 ✅** roles. 
Of course it possible to set these parameters (and more) manually, see below. But this is the bare minimum to successfully create an event

## Combining parameter

All the following described parameters can be combined in any order. A full example for an event may thus be for a standard trial event:

```
+create "Here my event name" 2019-12-20 8:15pm 2 :bandage: 2 :shield: 8 :crossed_swords: @trial-group
```


## Date and Time

Currently, this is not ideal, I will this more comfortable in an upcoming patch. But for now:

**Adding a date:**
```
+create "Here my event name" 2019-12-20
```
You have to keep to this format YYYY-MM-DD for the bot to recognize the date as such.

**Adding a time:**
```
+create "Here my event name" 8:15pm
```
You have to keep to this format h:mm(p/a)m for the bot to recognize the date as such. Add no spaces between the time and the am/pm.


## Roles

Roles can be added by 

## Signup restriction

## Description (not implemented, toDo)

## Notes (not implemented, toDo)


# Event closing


# Event deletion
