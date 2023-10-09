import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../service/apiServices";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {}, [quizId]);
  const fetchQuestions = async () => {
    const res = getDataQuiz(quizId);
    if(res && res.EC === 0 ){
        
    }
  }
  return <>detail quiz</>;
};
export default DetailQuiz;
