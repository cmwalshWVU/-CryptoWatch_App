import React from 'react'
import '../theme/card.scss';
import moment from 'moment';
import { IonCard, IonCardContent, IonCardTitle } from '@ionic/react';

const Article = (article: any, id: any) => {
    let url = article.article.urlToImage !== undefined ? article.article.urlToImage : article.article.imageurl;
    const date = article.article.publishedAt !== undefined ? moment(article.article.publishedAt).format("llll") :
      moment(article.article.published_on * 1000).format("llll")
  return (
    <IonCard className="article-card">
        <IonCardContent className="card-content grey-text text-darken-3">
            <IonCardTitle className={"articleTitle"} >
            {article.article.title}
            </IonCardTitle>
            <div className="article-body" >
                <div className="card-body"> {article.article.body ? article.article.body.substring(0, 150) + "..." : article.article.description ? article.article.description.substring(0, 150) + "..." : ""}</div>
                <img className="thumbnail" src={url} />
            </div>

            <div className={"articleFlex"}>
                <div className="articleDate">{date}</div>
                <a className="readMore" href={`${article.article.url}`} target="_blank">Read More</a>
            </div>
        </IonCardContent>
    </IonCard> 
  );
}

export default Article;
