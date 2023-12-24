import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
const blogs = [];

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    res.render("create.ejs");
});

app.post("/created", (req, res) => {
    const newBlog = {
        heading: req.body["bloghead"],
        content: req.body["blog"]
    };
    blogs.push(newBlog);
    res.redirect("/blog");
});

app.get("/blog", (req, res) => {
    res.render("blog.ejs", {
        blogs: blogs
    });
});

// Delete blog route
app.get("/delete/:blogId", (req, res) => {
    const blogId = req.params.blogId;

    // Check if blogId is a valid index
    if (isNaN(blogId) || blogId < 0 || blogId >= blogs.length) {
        res.status(404).send("Blog not found");
    } else {
        // Remove the blog at the specified index
        blogs.splice(blogId, 1);
        res.redirect("/blog");
    }
});

// Edit blog route (render edit form)
app.get("/edit/:blogId", (req, res) => {
    const blogId = req.params.blogId;

    // Check if blogId is a valid index
    if (isNaN(blogId) || blogId < 0 || blogId >= blogs.length) {
        res.status(404).send("Blog not found");
    } else {
        // Render the edit form, passing the blog data
        res.render("edit.ejs", { blog: blogs[blogId], blogId });
    }
});

// Update blog route (handle form submission for editing)
app.post("/edit/:blogId", (req, res) => {
    const blogId = req.params.blogId;

    // Check if blogId is a valid index
    if (isNaN(blogId) || blogId < 0 || blogId >= blogs.length) {
        res.status(404).send("Blog not found");
    } else {
        // Retrieve the updated data from the form
        const editedBlog = {
            heading: req.body["bloghead"],
            content: req.body["blog"]
        };

        // Update the blog data in the array
        blogs[blogId] = editedBlog;

        // Redirect to the view all blogs page
        res.redirect("/blog");
    }
});

// ... (rest of the code)

app.listen(port, () => {
    console.log(`The server has been successfully running on port ${port} :`);
});
