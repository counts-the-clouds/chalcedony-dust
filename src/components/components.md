# Components

The components package contains all the User Interface heavy classes. Because 
these classes are difficult to test we should avoid putting any heavy logic in 
this package, and should really just stick to manipulating the DOM and handling
the Pixi stuff in here.
