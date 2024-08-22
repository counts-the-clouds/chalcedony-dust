# Extensions
I really don't like the way Javascript handles anything related to Object 
Oriented Programming, and I find that most the time just generally better to 
avoid inheritance.

Sometimes though you do need to share code between models. For instance, this
game has characters, minions, guardians, adventurers. They're different enough
to warrant having separate models, however they all share things like skills, 
and equipment, and what not. 

With traditional OOP you'd need a base class that has all of this shared 
functionality, or you'd create an interface that defines the shared behaviors. 
However because I'm wanting to avoid all inheritance, I'm doing something akin 
to Ruby's mixins, or a Java Interface with default methods. 

Basically all an extension does is take a model that's been created by a 
factory function, and passing it to an extension to add all of the extension's
functions to the initial model. A model, when you look at it, is only a big 
ball of functions anyway, so extending it with the extension's functions is the
natural way of sharing functionality. 
