"start": "serve -s build",      - make sure to change start script in package.json to this for heroku.




ills or incumbents

Have a button for covid-19 related bills. Show each version of bill and each vote on those bill as well as the changes + and - of the bills and what the final results were. Did my senator vote against the version that gave us money and voted for the version that got rid of that money for me and the corporations got more, etc..

Who is winning amongst bill versions updated/approved

maybe a tab for ALL, DEM, REP, INCUMBENT

Fetch all members first then iterate over members and input id into AllMemberInfo ad store all those values into a newMembers variable that we can use for state storage and database storage
make a popup when page originally loads to sign in or sign up (give time for page to run its fetches and renderings)

Make a browser out of react where its components as opposed to tabs, and tab-tree

Comments section based on tags (tags are congresspeople or bills)

expand arrow for more info opens out to right (or left) and bills shrinks (when bill shrinks too much it becomes icon to be clickable so you can get back to it easier, navar maybe for everything)

Votes arrow bar right, the voted bitlls can be added to bills ssection so you can add whatever bills to bills column from there as well as searching.
Member first drop down side arrow votes bar leads to a slim column list of recent votes showing:(HR-6530: Yes). When this window pops out, those bills will be automatically filtered into bills section so you can see and read about each bill

Make bills area a selectable card

next_election: "2020" if true should create a border indicating upcoming election

Don't let member card be inside search and form paper because it re-fetches the people and their images whenever you pick or delete a person

REDUX STORE WHAT I WANT TO DO:
Upon loading:
    Grab senate members
    Grab house members
    Iterate over each member and pass ID through to Votes, Statements, RecentBils, Headshot
    Store each member and its representing votes, statemtents, recentbills, headshots as keys within an array withinn that member that is inside of an array that lists all members

    Members: [
        member1: [
            {
                votes:[
                    {

                    }
                ]
                statements:[
                    {

                    }
                ]
                recentBills:[
                    {

                    }
                ]
                headshot: '   ',
            }
        ]
    ]
const initialState = {
    houseMembers: [{
        members: [{
            member: [{}],
            bills: [{}],
            statement: [{}],
            headshot: 'dummy-profile-pic'
        }]
    }],
    senateMember: [{
        members: [{
            member: [{}],
            bills: [{}],
            statement: [{}],
            headshot: 'dummy-profile-pic'
        }]
    }],
    loading: false 
};


-Create grid for bills and members cards so you can have everything set up in designated spots. 
-For bill text summary, make it a field for scrolling so it doesnt expand the entire length/height.

-Make bills/members autocomple have checkboxes on left (will actually be bubble icon with pencil fill in as checked) and not remove dropdown when clicking a bill/member. 

-Can also make a more intense filter. I want to be able to see under members "co-sponsored bills" where you can click an arrow next to the bill and it sends it to the 
  bills filter page as a selected bill. (using setSelectedBill? ) and maybe vice versa under bills "sponsor" can have arrow and be clicked to include in the corresponding setSelectedMember column (house or sentate)

-



HOW AM I SUPPOSED TO SET UP ALL THE FETCHES!!!???
    -upon initialization, fetch propublica info
        -dispatch loading, and adding members
            -this then checks the database for those records, anything new gets updated in the DB, rest is left alone becuase its same. 
            
