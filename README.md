<h1> CHER'S CLOSET </h1>
Inspired by Cher's Closet from the 1995 movie Clueless

<a href="https://youtu.be/XNDubWJU0aU" target="_blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrwsXCmF8_kI64HCoARAe5diS4GKnobh563k3xHSeP9SVk3xO"
alt="CLUELESS" width="240" height="180" border="10" /></a>

This program was created as a final React project
at FlatIron School by Linya Hu, Maria Cristina Simoes & Emily Seieroe
in March 2019

This program is written in React JavaScript for the front end and it includes a Ruby on Rails backend that allows information from the program to be stored in a database.

In Cher's Closet users can upload clothing items (stored and used in ItemCard.js) to their closet (ClosetContainer.js), create outfits out of many clothing items (OutfitContainer.js, OutfitCard.js) and then edit or delete items and outfits.  There is also a filter to view only certain items as chosen in the dropdown filter.

<h3> COMPONENT HIERARCHY </h3>


    App
    |---Header

    |---ClosetContainer
       |--ItemCard  

    |---OutfitContainer
        |--OutfitCard
        |--NewOutfit
        |    |-ItemCard
        |--EditOutfit
             |-ItemCard

    |---Upload




<h3> SCHEMA (models for Rails backend) </h3>

<h6>USER</h6> has_many: outfits;
     <br>has_many: items


<h6>OUTFIT</h6> has_many :outfit_items;
        <br>has_many :items,
        <br>through :outfit_items;
        belongs_to :user

<h6>ITEM</h6> has_many :outfit_items;
      <br>has_many :outfits, through: :outfit_items;
      <br>belongs_to :user;
      <br>has_one_attached :image

<h6>OUTFIT-ITEM</h6>   belongs_to :outfit;
<br>  belongs_to :item
