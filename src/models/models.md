# Models
Models are stateful objects that are accessed through their associated 
`DataStore` class. Because there can be many instances of a model and because
other objects can reference a model they are all given a unique id. Models with
a `code` attribute also have an immutable form with is accessed through their
associated `Registry`