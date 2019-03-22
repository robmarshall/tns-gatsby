<h1>
    Starter code for an SEO enabled WordPress blog turned Gatsby.
</h1>

<h2>Includes:</h2>
<ul>
    <li>Posts, categories and tags pages</li>
    <li>WordPress Menu Integration
    <li>Yoast Integration on Posts/Pages - Still need to add fallback image setting</li>
    <li>Facebook/Twitter meta data</li>
    <li>Partly semantic - This will be improved</li>
    <li>404 Page</li>
    <li>Image component to easily use images from src/images</li>
    <li>Super speedy fast</li>
    <li>Links to WordPress settings to get title and description</li>
    <li>Easy Google Analytics Integration</li>
</ul>

<h2>Connecting to WordPress</h2>
<p>Due to this build requiring admin access (for full control from WordPress) an <i>env.development</i> file is required for the development, and the same variables in this are needed as environment variables on you hosting provider.</p>

<p>The build doesn't currently create a static site when login details are not included. This will be added later</p>

<p>An example env. file is included as env.example</p>

<p><b>File</b></p>

<ul>
    <li>JWT_USER: Your admin user username - I set up a new user just for this. This makes it easier to control access rights.</li>
    <li>JWT_PASSWORD: The user password - this is required to get settings information</li>
</ul>

<h2>Connecting to Google Analytics</h2>

<p>To connect to Google Analytics all you need to do is add your Google IDs to the .env file</p>
This build is set up to accept:
<ul>
<li>Standard Analytics</li>
<li>Optimze</li>
<li>Experiment</li>
<li>Variation</li>
</ul>

<p>Need to include outbound link tracking as standard.</p>
