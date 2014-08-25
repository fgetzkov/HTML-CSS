<?php include 'header.html'; ?>
<main>
    <div class="wrapper">
        <?php include 'side.html'; ?>

        <div class="col-forum moccasin">
            <div class="box-forum">
                <h3><a href="single.php" title="">HTML & CSS курс за начинаещи – от 7 юни 2044 в СофтУни</a></h3>
                <div class="metaTop">
                    <span class="author">Nakov</span>
                    <span class="time">26/06/2014</span>
                    <span class="category">Web Fundamentals (HTML/CSS)</span>
                </div>
                <hr>
                <div class="metaBottom">
                    <ul>
                        <li>
                            <div class="arrows">
                                <span class="up arrow" id="up"></span>
                                <span class="down arrow" id="down"></span>
                                <span class="unvote" id="unvote"></span>
                            </div>
                        </li>
                        <li class="pts">
                            <span class="post-pts">14</span>
                            <span class="vva">votes</span>
                        </li>
                        <li>
                            <span class="post-pts">3231</span>
                            <span class="vva">views</span>
                        </li>
                        <li
                            <span class="post-pts">0</span>
                            <span class="vva">answers</span>
                        </li>
                    </ul>
                    <!--                <div class="answere">
                                        <a href="">Answered:</a>
                                        <a href="">zdgeorgiev</a>
                                        <span class="time">01/07/2014 23:02:45</span>
                                    </div>-->
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="col-forum moccasin">
            <div class="box-forum">
                <h3><a href="single.php" title="">За системата на форума - въпроси/предложения/бъгове</a></h3>
                <div class="metaTop">
                    <span class="author">charlike </span>
                    <span class="time">09/03/2014</span>
                    <span class="category">Предложения и проблеми</span>
                </div>
                <hr>
                <div class="metaBottom">
                    <ul>
                        <li>
                            <div class="arrows">
                                <span class="up arrow" id="up"></span>
                                <span class="down arrow" id="down"></span>
                                <span class="unvote" id="unvote"></span>
                            </div>
                        </li>
                        <li class="pts">
                            <span class="post-pts">35</span>
                            <span class="vva">votes</span>
                        </li>
                        <li>
                            <span class="post-pts">14681</span>
                            <span class="vva">views</span>
                        </li>
                        <li
                            <span class="post-pts">1268</span>
                            <span class="vva">answers</span>
                        </li>
                    </ul>
                    <div class="answere">
                        <a href="">Answered:</a>
                        <a href="">Teodor92</a>
                        <span class="time">02/07/2044 23:02:45</span>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="col-forum">
            <div class="box-forum">
                <h3><a href="single.php" title="">Курс по PHP и MySQL за начинаещи в СофтУни – от юни 2014</a></h3>
                <div class="metaTop">
                    <span class="author">Nakov</span>
                    <span class="time">12/04/2014</span>
                    <span class="category">PHP/MySQL</span>
                </div>
                <hr>
                <div class="metaBottom">
                    <ul>
                        <li>
                            <div class="arrows">
                                <span class="up arrow" id="up"></span>
                                <span class="down arrow" id="down"></span>
                                <span class="unvote" id="unvote"></span>
                            </div>
                        </li>
                        <li class="pts">
                            <span class="post-pts">2</span>
                            <span class="vva">votes</span>
                        </li>
                        <li>
                            <span class="post-pts">658</span>
                            <span class="vva">views</span>
                        </li>
                        <li
                            <span class="post-pts">0</span>
                            <span class="vva">answers</span>
                        </li>
                    </ul>
                    <!--                <div class="answere">
                                        <a href="">Answered:</a>
                                        <a href="">zdgeorgiev</a>
                                        <span class="time">01/07/2014 23:02:45</span>
                                    </div>-->
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</main>

<script>
    var votes = localStorage.getItem('votes');
    if (votes) {
        $('.pts .post-pts').html(votes);
    }

    var voted = localStorage.getItem('last_vote');
    var bug = localStorage.getItem('forum_vote');
    if ((voted === 'up' || voted === 'down') && bug === 'fixed') {
        $('.arrow').hide();
        showw('span.unvote');
    }
</script>

<?php include 'footer.html'; ?>