# TheShelterPeople_sg

Animal Shelter Website for TheShelterPeople.

Even though the volunteer group has since been disbanded as of 2023, I keep this website up as a reminder of the cats.

<!-- Visit the website here: https://theshelterpeople-sg.herokuapp.com/ -->

## Description

This Animal Shelter website was refined from the prototype that was created for a project.

_Extremely big_ special shout out to my wonderful group mates (They the MVPs!!), without whom this website would not be possible! Check out the prototype's github [here.](https://github.com/soniasltan/Project-3---The-Shelter-People)

# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [Unreleased]

## [2.0.0] - Sep 2023

### Deprecated

- Heroku deployment

### Changed

- MERN to PERN stack
- Cage 6/7 will be set to cage 6 as cage is now defined as integer

### Added

- User controller to include read and update
- Comment controller to include get comment by cat ID due to change from MongoDB to PostgreSQL

## [1.1.0] - 9 Dec 2021

### Added

- Signup update: checks if username/email exists before creating user

### Changed

- React router upgraded to v6
- Adoptable cats and Unadoptable cats are separated
- Styling changes: Edited CSS for better view on devices

###### Planning

```
4 Sep 2023 - Reading up on PERN stack
Reading on changes to be made from MERN to PERN
Looking at current data structure and changes to be made
Will need to relook at the whole project again

5 Sep 2023 - Planning for changes.

Plans for changes:
-[x] 1. Draw data diagram
-[x] 2. Set up new postgres database
-[x] 3. Change models
-[ ] 4. Change controllers
-[ ] 5. Test API with postman
-[ ] 6. Migrate data from mongoDB to postgres
-[ ] 7. Test after migration
-[ ] 8. Adjust frontend to new API
-[ ] 9. Look at hosting options

Sketch data diagram.
Set up pg database and models.

6 Sep 2023 - Added ERD diagram.

7 Sep 2023 - Installed pg library.
Read up on pg website.
Adjust cat controller.

8 Sep 2023 - Adjust user controller.

9 Sep 2023 - Added read and update to user controller.
Adjust comment controller.
Added get comment by cat ID to comment controller.

10 Sep 2023 - Adjust session controller.
Set username and email in user model to unique.
```
