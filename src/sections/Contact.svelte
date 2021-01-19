<a name="contact">
<section class="contact">
        <h2>Contact Us</h2>
        <p>Send us a message at <a href="mailto:support@scribehacks.tech">support@scribehacks.tech</a> or use this form to submit an inquiry.</p>
    <form align="center" id="contact-form" action="mailto:support@scribehacks.tech">
        <input name="subject" type="text" placeholder="Subject..."><br>
        <textarea name="body" placeholder="Message..."></textarea>
        <input class="button" type="submit" value="Send" />

    </form>
</section>
</a>

<style type="text/scss">
    .contact {
        background-color: var(--bg-light);
        padding: 30px 30px;
        justify-content: center;
        
        h2 {
            font-size: 2rem;
            text-align: center;
            margin: 0;
        }
        p {
            text-align: center;
        }
        input, textarea {
            border-radius: 5px;
            border: transparent 2px solid;
            background-color: var(--bg-lightest);
            /*box-shadow: var(--bxs-lightest) 2px 2px 10px;*/

            margin-bottom: 15px;
            width: 100%;
            padding: 5px;
            font-size: 14px;
            font-family: "CircularStd", sans-serif;
            font-weight: 400;
            outline: none;
            padding: 15px;
        }
        textarea {
            height: 40vh;
        }
        form {
            margin:0 auto;
            min-width: 45%;
            max-width: 65%;
            padding-right: 30px;
            text-align: center;
        }
        .button{
            width: 25%;
            background-color: var(--bg-lightest);
            border-radius: 3px;
            margin-top: 30px;
            text-decoration: none;
        }
        .button:hover{
            background-color: var(--accent-secondary);
            color: var(--text-inverse);
        }    
        @media only screen and (max-width: 420px){
            form{
                max-width: 95%;
                text-align: center;
            }
            .button{
                width: 100%;
            }
        }
        
    }
</style>
