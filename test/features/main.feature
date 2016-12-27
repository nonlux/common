Feature: Monkey Prototype
As monkey coder
I want to fast create http prototype

Scenario: Generate prototype from json
When I define prototype 
----------
{
 "Paragraph": "foo"
}
----------
Then I should see  html output "<p>foo</p>"
