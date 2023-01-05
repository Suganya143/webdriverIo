Feature: Google search

@demo
Scenario Outline: Test scenario
    Given open the webpage
    When click the <option>
    Then the url should match with <expectedUrl>
Examples:
    | search | expectedUrl                                    |
    | WDIO   | https://courses.rahulshettyacademy.com/courses |


 