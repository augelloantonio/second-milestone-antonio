# Interactive Front-End Development Milestone Project

# [#HELPYOURBRAIN](https://gello94.github.io/first-milestone-antonio)


<h1 align="center">
  <a href="" target="_blank"><img src="/assets/img/matchThreeExample.jpg" alt="#HELPYOURBRAIN logo"/></a>
</h1>

![Page Logo](https://github.com/gello94/second-milestone-antonio/blob/master/assets/img/pagelogo2.jpg)


This Website was developed for Code Institute's Interactive Front End Development Project 2.

#HelpYourBrain born as a multi level memory game for people of all the ages. The scope of this game it to match cards with the same image, helping people the challenge their memory.

## UX
 
This Project is to demonstrate lessons learned up to the implementation of the Interactive Frot End section.

The website was build following the principle Mobile First and the UX is designed following the Bootstrap Grid system. 

The idea was to build a multi level memory game, with the incrementation of 4 cards for each level the scope of witch is to match two card with the same image.
To made the game more interesting and not annoying from level 5 up to te last level, the 8th, the card to match are three and not anymore only two.

The website is a single page website, full responsive, with Bootstrap Modal largely used in all the page. 

The layout is very simple: 
- Aside on the left where there are the logo, the game commands and the menu, very simply and intuitive to use for the user;
- Game and player info on the header with all the match info;
- Boarding game desk, where the cards are displayed. 


### Scenarios

##### Child:

As a child I would like to find easy instruction with images, to made easier to understand how to play. The "onload modal" show the instruction with pictures that made it clear, as well the "instruction modal" has images to show how to play.

##### Adult user:

As an adult what I want is to find gaming commands

##### User listening music:

As a user that is listening music what I would like is to easly find a way to turn off the sounds of the game. The "sound button" on the game command bar made it easier for all the users that whant to turn off the sounds.


## Feature

As mentioned the webpage has a very simple layout.

The structure is as follow:

* **Aside**: A simple responsive aside bar with the logo on the top, the game commands as Play/Stop button, Reset button, Audio off/Audio on button and a menu below same. The menu will be showed as "Hamburger Menu" on width < 768px with an interactive button changing class.
* **Header**: Basic header with player and match info as: Player, Level, Total click, Total match, Total score and the match time.
* **Game Section**: The card desk where the card will be displayed when the user start the game, same made by javascript.

The Bootstrap's Modals were used for the Alerts and the mwnu windows.
The Game commands and the social icons presents in the "credits modal" are made using FontAwesome, personilized with css.

#### _Game Commands_

For the Game Commands are used FontAwesome's icons, styled with CSS. 

The commands present are:

- Play/Pause button: styled with CSS and set to change class with javascript at the user click, this way it will be displayed the pause class and at the pause class it will be assigned the function to restart the game.
- Restart button: with this button all the value will be set as at the start of the game and the user can restart the game.
- Sounds On/Off button: as for the Play/Pause button the sounds button was styled with CSS and set to change class with javascript at the user click, this way it will be displayed the off volume class and it will be assigned the function to restart the sounds at the next click.


#### _Menu_

To display all the menu windows I used the Bootstrap's Modal.

The menu includes the following sections:

- Instructions: simple instruction for the user that will explain to the user how to play.
- Change Player Name: It give the possibility to the user to change the player name.
- Credits: It will display developer info, with GitHub and Linkedin profile, icons styled with FontAwesome.

#### _Game Section_

The game board is created by a javascript function that will made a new div element assigning it the value of my cardList array and with an onClick function to shuffle the values and give randomized cards on the desk.

At the start of the game, when the user click the "play button" to start the game 4 cards will be displayed and for each level until the 4th will be added 4 new cards.

At the level 5th the card displayed will be 9 and 3 new cards will be added on each level.

At the end of the game the game board is empty.


### Features Left to Implement

- Implement a players list with relatives score to permitt the user to compare the best scores.
- 4 new levels where the card will be displayed flipped for a set time and the user has to match the card having only a number of possibility to be defined.


## Technologies Used

For this project I used:

- [HTML5]( https://en.wikipedia.org/wiki/HTML5)
    - The project uses **HTML5** to structure the content in line with modern semantic html5.

- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets#CSS_3)
    - The project uses **CSS3** to style the html content.

- [Bootstrap 4.3.1](https://getbootstrap.com/)
    - The project uses **Bootstrap 4.3.1** to Layout the html content on different screen sizes.

- [FontAwesome](https://fontawesome.com/)
    - The project uses **FontAwesome** to add icons for social media and contact forms.

- [GoogleFonts](https://fonts.google.com/)
    - The project uses **GoogleFonts** to add the font Roboto importing same in my CSS.

- [Google Images](https://www.google.com/imghp?hl=en)
    - I used **Google Images** to find the icons for my cards, research done using the fiter to find images with the permitt to be used.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to control scrolling and toggle features.

- [Stackoverflow](https://stackoverflow.com)
    - For the project I used **stackoverflow** community to help building the game searching for scripts and explanations.
 
- [Freesound](https://freesound.org/search/?q=done)
    - For the sounds I used **Freesound** to find sounds with free license to add to the game.

- [Soundbible](http://soundbible.com/tags-click.html)
    - For the sounds I used as well **Soundbible** to find sounds with free license to add to the game.


## Testing

To test this project I used various browsers and devices.

#### Mobile Browsers
* Chrome
* Safari
* Internet Samsung 

#### Desktop Browsers
* Chrome
* Firefox
* Edge

#### Devices
* Hp Laptop
* Asus Laptop
* Acer Laptop
* Samsung S8
* Iphone X

During testing i used Chrome Developer tools to test the responsive design on different size and the features of the page on different width.

The site was developed following the Bootstrap Grid System and the same was tested to ensure that all the elements are responsive on the following resolutions on each page:

- Width ≥1200px 
- Width between 1200px and 768px
- Width ≤ 768px 

### During development

Few bugs appeared during the developing process:


### Forms and Gallery Testing

1. Sign Up form:
    1. Go to one of the page and click on the Sign Up button
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid.

2. Contact form:
    1. Go to the ["Contact Us"](https://gello94.github.io/first-milestone-antonio/contact.html) page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid.

3. Animated Gallery 
    1. Go to the ["Photobook"](https://gello94.github.io/first-milestone-antonio/gallery.html)
    2. Try to move your indicator on the images and see the css transitions working.
    3. Try to click on one of the images and see how the image will be displayed full screen in the same page with a transition effect.
    4. Click again to go back on the gallery.
    5. Now try to set the display on a resolution of 768px or less and click on one of the images and see how the transition is not displayed.


### Validation Testings

For HTML validation testing I used ["W3 Validator"](https://validator.w3.org/nu/?doc=https%3A%2F%2Fgello94.github.io%2Ffirst-milestone-antonio%2F) which shows the html documents to be valid.

For CSS validation testing I used ["W3 CSS Validator"](http://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fgello94.github.io%2Ffirst-milestone-antonio%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=it) which shows the stylesheet to be valid CSS3.

## Deployment

This page has been deployed to ["Github Pages"](https://gello94.github.io/first-milestone-antonio/).

GitHub is used to host the code and publish the pages.

A new repository was created in GitHub called: second-milestone-antonio.

After a final Git Add and Git commit

`$git add .`

`$git commit -m "Final commit"`

The pages were pushed to the GitHub repository

`$ git push -u origin master`

`$Username`

`$Password`

Under the Settings – GitHub Pages of the new repository, the master branch of the code is published to the url:
https://gello94.github.io/first-milestone-antonio/

## Credits

Thanks to CodeInstitute Slack Community helping me to find extra material to study to improve my knowledges to develop this game.

### Media

- The icons used for the user review in the Home Page are taken from ["Google Images"](https://www.google.com/imghp?hl=en), found using the filter "re-use rights".
- The Logo used is made by me with Adobe Photoshop, all credits reserved.

