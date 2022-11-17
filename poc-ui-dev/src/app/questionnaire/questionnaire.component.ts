import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { MatRadioGroup } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { QuestionnaireDataService } from '../services/questionnaire-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  questionnaireId: string;
  questionnaireName: string;
  sectionIndex = 0;
  questionIndexInSection = 0;
  questionIndex = 0;
  answers = [];
  numOfQuestions = 0;
  progress = 0;
  questionnaireCompleted = false;
  isFirstQuestion = true;
  questionnaire;
  currentAnswer;
  answersArrayOfCurrentMarkingQuestion = [];
  bpi_marking_options = [
    // left
    'left_biceps',
    'left_triceps',
    'left_forearm_front',
    'left_forearm_rear',
    'left_antecubital',
    'left_elbow',
    'left_hand',
    'left_trapezius',
    'left_outer_back',
    'left_latissimus_dorsi',
    'left_lower_back',
    'left_gluteus_maximus',
    'left_gluteus_medius',
    'left_rectus_femorus',
    'left_vestus_medialis',
    'left_vestus_lateralis',
    'left_knee',
    'left_tibialis_anterior',
    'left_gastrocnemius',
    'left_ankle',
    'left_instep',
    'left_toes',
    'left_biceps_femoris',
    'left_semitendinosus_and_semimembranosus',
    'left_tendon',
    'left_gastrocnemius_literal_head',
    'left_gastrocnemius_medial_head',
    'left_adductor_magnus',
    'left_pectineus_and_adductor_longus_and_gracilis',
    'left_heel',
    'left_shoulder_front',
    'left_shoulder_rear',
    'left_wrist_front',
    'left_wrist_rear',
    'left_ribs',
    'left_waist',

    // right
    'right_biceps',
    'right_triceps',
    'right_biceps_femoris',
    'right_trapezius',
    'right_outer_back',
    'right_latissimus_dorsi',
    'right_lower_back',
    'right_gluteus_maximus',
    'right_gluteus_medius',
    'right_semitendinosus_and_semimembranosus',
    'right_tendon',
    'right_gastrocnemius_literal_head',
    'right_gastrocnemius_medial_head',
    'right_adductor_magnus',
    'right_pectineus_and_adductor_longus_and_gracilis',
    'right_heel',
    'right_forearm_front',
    'right_forearm_rear',
    'right_antecubital',
    'right_elbow',
    'right_rectus_femorus',
    'right_vestus_medialis',
    'right_vestus_lateralis',
    'right_knee',
    'right_tibialis_anterior',
    'right_gastrocnemius',
    'right_ankle',
    'right_instep',
    'right_toes',
    'right_shoulder_front',
    'right_shoulder_rear',
    'right_wrist_front',
    'right_wrist_rear',
    'right_ribs',
    'right_waist',
    'right_hand',

    // center
    'head_front',
    'head_rear',
    'neck_front',
    'cervical_spine',
    'thoracic_spine',
    'lumbar_spine',
    'sacrum',
    'chest_middle',
    'chest_right',
    'chest_left',
    'upper_stomach',
    'lower_stomach',
    'crotch',
  ];

  // BPI body pain diagram
  bodyPositions = {
    // left
    left_biceps: {
      position: { top: '25%', left: '31.7%', rotation: -22 },
      size: { width: '4.3%', height: '8.4%' },
    },
    left_triceps: {
      position: { top: '22.3%', left: '63.5%', rotation: 21 },
      size: { width: '3.95%', height: '10%' },
    },
    left_forearm_front: {
      position: { top: '34.8%', left: '37.7%', rotation: -31 },
      size: { width: '2.2%', height: '11%', radius: '0 0 5px 5px' },
    },
    left_forearm_rear: {
      position: { top: '34.2%', left: '59.3%', rotation: 23 },
      size: { width: '2.8%', height: '12.5%', radius: '0 0 8px 5px' },
    },
    left_antecubital: {
      position: { top: '33%', left: '34%', rotation: -22 },
      size: { width: '3.5%', height: '2.6%', radius: '42%' },
    },
    left_elbow: {
      position: { top: '32%', left: '62%', rotation: 22 },
      size: { width: '3.5%', height: '2.6%', radius: '25%' },
    },
    left_gluteus_medius: {
      position: { top: '43%', left: '30.07%', rotation: -16 },
      size: { width: '2%', height: '8%' },
    },
    left_rectus_femorus: {
      position: { top: '49.4%', left: '28.1%', rotation: 6 },
      size: { width: '3%', height: '14.2%' },
    },
    left_vestus_medialis: {
      position: { top: '59%', left: '26.8%', rotation: 2 },
      size: { width: '1%', height: '7.9%', radius: '50% 50% 17% 5%' },
    },
    left_vestus_lateralis: {
      position: { top: '58.2%', left: '30.6%', rotation: 21 },
      size: { width: '1.5%', height: '7.4%', radius: '35%' },
    },
    left_knee: {
      position: { top: '66.5%', left: '27.4%', rotation: -4 },
      size: { width: '4.2%', height: '4%', radius: '35%' },
    },
    left_tibialis_anterior: {
      position: { top: '70.5%', left: '30%', rotation: -6 },
      size: { width: '2.8%', height: '14.7%', radius: '5px 5px 10px 10px' },
    },
    left_gastrocnemius: {
      position: { top: '73.5%', left: '28.5%', rotation: -13 },
      size: { width: '1.3%', height: '12.3%', radius: '50%' },
    },
    left_ankle: {
      position: { top: '86.5%', left: '30.4%', rotation: 0 },
      size: { width: '2.1%', height: '5%', radius: '2px' },
    },
    left_instep: {
      position: { top: '91.8%', left: '30.4%', rotation: -12 },
      size: { width: '3.2%', height: '4.5%', radius: '2px 4px 2px 2px' },
    },
    left_toes: {
      position: { top: '96.5%', left: '30.7%', rotation: -9 },
      size: { width: '4.4%', height: '2.1%', radius: '5% 40% 25% 50%' },
    },
    left_biceps_femoris: {
      position: { top: '53.3%', left: '67.5%', rotation: 0 },
      size: { width: '3%', height: '13.7%', radius: '1px 14px 50% 50%' },
    },
    left_adductor_magnus: {
      position: { top: '54.7%', left: '73%', rotation: 4 },
      size: { width: '2%', height: '7.4%', radius: '2px 2px 50% 50%' },
    },
    left_semitendinosus_and_semimembranosus: {
      position: { top: '57%', left: '70.4%', rotation: 4 },
      size: { width: '2.5%', height: '15.6%' },
    },
    left_tendon: {
      position: { top: '83.3%', left: '64.5%', rotation: 3 },
      size: { width: '2.3%', height: '11.7%', radius: '25%' },
    },
    left_gastrocnemius_literal_head: {
      position: { top: '71.6%', left: '68.2%', rotation: 7 },
      size: { width: '2.4%', height: '11.5%', radius: '50%' },
    },
    left_gastrocnemius_medial_head: {
      position: { top: '69.5%', left: '65.7%', rotation: 16 },
      size: { width: '2.2%', height: '13.3%', radius: '45%' },
    },
    left_pectineus_and_adductor_longus_and_gracilis: {
      position: { top: '45.7%', left: '25.5%', rotation: 14 },
      size: { width: '3%', height: '13%', radius: '45%' },
    },
    left_heel: {
      position: { top: '95.9%', left: '64.1%', rotation: -3 },
      size: { width: '3.1%', height: '3%', radius: '40%' },
    },
    left_shoulder_front: {
      position: { top: '16.9%', left: '30.9%', rotation: -40 },
      size: { width: '3.6%', height: '8.3%', radius: '50%' },
    },
    left_shoulder_rear: {
      position: { top: '15%', left: '65.2%', rotation: 46 },
      size: { width: '2.8%', height: '8%', radius: '50% 5% 5% 50%' },
    },
    left_wrist_front: {
      position: { top: '45%', left: '40.3%', rotation: -25 },
      size: { width: '2.5%', height: '3%', radius: '30%' },
    },
    left_wrist_rear: {
      position: { top: '46%', left: '57%', rotation: 25 },
      size: { width: '2.5%', height: '3%', radius: '30%' },
    },
    left_ribs: {
      position: { top: '27.5%', left: '27.9%', rotation: 0 },
      size: { width: '2.15%', height: '8.7%', radius: '20%' },
    },
    left_waist: {
      position: { top: '36.5%', left: '27.7%', rotation: 0 },
      size: { width: '2.7%', height: '6.1%', radius: '20%' },
    },
    left_trapezius: {
      position: { top: '12.1%', left: '73.4%', rotation: 0 },
      size: { width: '1.9%', height: '15%', radius: '50% 1% 1% 50%' },
    },
    left_outer_back: {
      position: { top: '18.8%', left: '67.7%', rotation: -19 },
      size: { width: '5.2%', height: '6.1%', radius: '11px 2px 11px 5px' },
    },
    left_latissimus_dorsi: {
      position: { top: '25.3%', left: '69%', rotation: -17 },
      size: { width: '5.5%', height: '9.1%', radius: '35% 35% 50% 10%' },
    },
    left_lower_back: {
      position: { top: '32.4%', left: '73.35%', rotation: 0 },
      size: { width: '2%', height: '9.5%', radius: '80px 5% 5% 66px' },
    },
    left_gluteus_maximus: {
      position: { top: '42%', left: '69.4%', rotation: 3 },
      size: { width: '5.8%', height: '12.3%', radius: '49% 28% 15% 30%' },
    },
    left_hand: {
      position: { top: '47.5%', left: '41.7%', rotation: -25 },
      size: { width: '4.2%', height: '8.3%', radius: '35%' },
    },

    // RIGHT SIDE
    right_biceps: {
      position: { top: '25%', left: '11.2%', rotation: 22 },
      size: { width: '4.3%', height: '8.1%' },
    },
    right_triceps: {
      position: { top: '22.3%', left: '85.3%', rotation: -21 },
      size: { width: '3.95%', height: '10%' },
    },
    right_rectus_femorus: {
      position: { top: '49.4%', left: '16%', rotation: -6 },
      size: { width: '3%', height: '14.2%' },
    },
    right_vestus_medialis: {
      position: { top: '59%', left: '19.35%', rotation: -2 },
      size: { width: '1%', height: '7.9%', radius: '50% 50% 5% 17%' },
    },
    right_vestus_lateralis: {
      position: { top: '58.1%', left: '15.2%', rotation: -21 },
      size: { width: '1.5%', height: '7.4%', radius: '35%' },
    },
    right_knee: {
      position: { top: '66.5%', left: '15.6%', rotation: 4 },
      size: { width: '4.2%', height: '4%', radius: '35%' },
    },
    right_tibialis_anterior: {
      position: { top: '70.5%', left: '14.59%', rotation: 6 },
      size: { width: '2.8%', height: '14.7%', radius: '5px 5px 10px 10px' },
    },
    right_gastrocnemius: {
      position: { top: '73.5%', left: '17.55%', rotation: 13 },
      size: { width: '1.3%', height: '12.3%', radius: '50%' },
    },
    right_ankle: {
      position: { top: '86.5%', left: '14.85%', rotation: 0 },
      size: { width: '2.1%', height: '5%', radius: '2px' },
    },
    right_instep: {
      position: { top: '91.8%', left: '13.85%', rotation: 12 },
      size: { width: '3.2%', height: '4.5%', radius: '2px 4px 2px 2px' },
    },
    right_toes: {
      position: { top: '96.5%', left: '12.1%', rotation: 14 },
      size: { width: '4.4%', height: '2.1%', radius: '38% 23% 55% 23%' },
    },
    right_forearm_front: {
      position: { top: '34.8%', left: '7.4%', rotation: 31 },
      size: { width: '2.2%', height: '11%', radius: '0 0 5px 5px' },
    },
    right_forearm_rear: {
      position: { top: '34%', left: '90.76%', rotation: -23 },
      size: { width: '2.8%', height: '12.5%', radius: '0 0 5px 8px' },
    },
    right_antecubital: {
      position: { top: '32.9%', left: '9.8%', rotation: 22 },
      size: { width: '3.5%', height: '2.6%', radius: '10px' },
    },
    right_elbow: {
      position: { top: '32%', left: '87.5%', rotation: -22 },
      size: { width: '3.5%', height: '2.6%', radius: '25%' },
    },
    right_gluteus_medius: {
      position: { top: '43%', left: '15.4%', rotation: 16 },
      size: { width: '2%', height: '8%' },
    },
    right_biceps_femoris: {
      position: { top: '53.3%', left: '82.4%', rotation: 0 },
      size: { width: '3%', height: '13.7%', radius: '14px 1px 50% 50%' },
    },
    right_adductor_magnus: {
      position: { top: '54.7%', left: '77.8%', rotation: -4 },
      size: { width: '2%', height: '7.4%', radius: '2px 2px 50% 50%' },
    },
    right_semitendinosus_and_semimembranosus: {
      position: { top: '57%', left: '80%', rotation: -4 },
      size: { width: '2.5%', height: '15.6%' },
    },
    right_tendon: {
      position: { top: '83%', left: '86%', rotation: -3 },
      size: { width: '2.3%', height: '12%', radius: '25%' },
    },
    right_gastrocnemius_literal_head: {
      position: { top: '71.9%', left: '82.3%', rotation: -7 },
      size: { width: '2.4%', height: '11.5%', radius: '50%' },
    },
    right_gastrocnemius_medial_head: {
      position: { top: '69.5%', left: '84.9%', rotation: -16 },
      size: { width: '2.2%', height: '13.3%', radius: '45%' },
    },
    right_pectineus_and_adductor_longus_and_gracilis: {
      position: { top: '45.7%', left: '18.7%', rotation: -14 },
      size: { width: '3%', height: '13%', radius: '45%' },
    },
    right_heel: {
      position: { top: '95.9%', left: '85.5%', rotation: 3 },
      size: { width: '3.1%', height: '3%', radius: '40%' },
    },
    right_shoulder_front: {
      position: { top: '16.9%', left: '12.8%', rotation: 40 },
      size: { width: '3.6%', height: '8.3%', radius: '50%' },
    },
    right_shoulder_rear: {
      position: { top: '15%', left: '84.6%', rotation: -46 },
      size: { width: '2.8%', height: '8%', radius: '5% 50% 50% 5%' },
    },
    right_wrist_front: {
      position: { top: '45%', left: '4.2%', rotation: 32 },
      size: { width: '2.5%', height: '3%', radius: '30%' },
    },
    right_wrist_rear: {
      position: { top: '46%', left: '93.3%', rotation: -24 },
      size: { width: '2.5%', height: '3%', radius: '30%' },
    },
    right_ribs: {
      position: { top: '27.5%', left: '17%', rotation: 0 },
      size: { width: '2.15%', height: '8.7%', radius: '20%' },
    },
    right_waist: {
      position: { top: '36.5%', left: '16.7%', rotation: 0 },
      size: { width: '2.7%', height: '6.1%', radius: '20%' },
    },

    // center
    head_front: {
      position: { top: '1.5%', left: '20.3%', rotation: 0 },
      size: { width: '6.9%', height: '12%', radius: '50%' },
    },
    head_rear: {
      position: { top: '0.5%', left: '73%', rotation: 0 },
      size: { width: '6.8%', height: '8.9%', radius: '46% 46% 29% 29%' },
    },
    neck_front: {
      position: { top: '13.55%', left: '22.1%', rotation: 0 },
      size: { width: '3%', height: '5%', radius: '5% 5% 50% 50%' },
    },
    cervical_spine: {
      position: { top: '9.6%', left: '75.4%', rotation: 0 },
      size: { width: '2%', height: '5.7%', radius: '2px' },
    },
    thoracic_spine: {
      position: { top: '15.5%', left: '75.4%', rotation: 0 },
      size: { width: '2%', height: '20.7%', radius: '5%' },
    },
    lumbar_spine: {
      position: { top: '36.5%', left: '75.4%', rotation: 0 },
      size: { width: '2%', height: '7.6%', radius: '5%' },
    },
    sacrum: {
      position: { top: '44.5%', left: '75.4%', rotation: 0 },
      size: { width: '2%', height: '6.1%', radius: '5%' },
    },
    right_trapezius: {
      position: { top: '12.1%', left: '77.5%', rotation: 0 },
      size: { width: '1.9%', height: '15%', radius: '1% 50% 50% 1%' },
    },
    right_outer_back: {
      position: { top: '18.8%', left: '79.8%', rotation: 16 },
      size: { width: '5.2%', height: '6.1%', radius: '0px 10px 7px 10px' },
    },
    right_latissimus_dorsi: {
      position: { top: '25.3%', left: '78.3%', rotation: 17 },
      size: { width: '5.7%', height: '9.1%', radius: '35% 35% 10% 50%' },
    },
    right_lower_back: {
      position: { top: '32.4%', left: '77.5%', rotation: 0 },
      size: { width: '2%', height: '9.5%', radius: '5% 80px 66px 5%' },
    },
    right_gluteus_maximus: {
      position: { top: '42%', left: '77.722%', rotation: -3 },
      size: { width: '5.8%', height: '12.3%', radius: '28% 49% 30% 15%' },
    },
    chest_middle: {
      position: { top: '18.55%', left: '22.75%', rotation: 0 },
      size: { width: '1.8%', height: '8%', radius: '50%' },
    },
    chest_right: {
      position: { top: '19.3%', left: '16.3%', rotation: 34 },
      size: { width: '6.7%', height: '7.6%', radius: '42% 63% 49% 5%' },
    },
    chest_left: {
      position: { top: '19.3%', left: '24.25%', rotation: -34 },
      size: { width: '6.5%', height: '7.7%', radius: '63% 49% 5% 50%' },
    },
    upper_stomach: {
      position: { top: '27.1%', left: '19.55%', rotation: 0 },
      size: { width: '7.7%', height: '12.4%', radius: '20%' },
    },
    lower_stomach: {
      position: { top: '40%', left: '20.2%', rotation: 0 },
      size: { width: '6.5%', height: '6%', radius: '19% 19% 30% 30%' },
    },
    crotch: {
      position: { top: '46.2%', left: '21.3%', rotation: 0 },
      size: { width: '4.4%', height: '3.6%', radius: '10% 10% 50% 50%' },
    },
    right_hand: {
      position: { top: '47.5%', left: '1.1%', rotation: 25 },
      size: { width: '4.2%', height: '8.3%', radius: '35%' },
    },
  };

  @ViewChild('answerss', { static: false }) answerss: MatRadioGroup;

  constructor(
    private qs: QuestionnaireDataService,
    private us: UserService,
    private router: Router,
    private api: ApiService,
    private ren: Renderer2
  ) {
    this.questionnaireId =
      this.router.getCurrentNavigation().extras.state['id'];
  }

  logSomething(value, value2) {
    console.log(value, value2);
  }

  ngOnInit(): void {
    console.log(this.us.getPatientData());
    this.api.questionnaire(this.questionnaireId).subscribe((res) => {
      this.questionnaire = res;
      this.questionnaireName = this.questionnaire.name;
      this.questionnaire.sections.forEach((sec) => {
        this.numOfQuestions += sec.questions.length;
      });
      console.log(this.questionnaire);
    });
  }

  moveToNextSection() {
    this.sectionIndex++;
    this.questionIndexInSection = 0;
  }

  onQuestionnaireFinished() {
    this.questionnaireCompleted = true;
  }

  updateProgressBar() {
    this.progress = Math.round(
      this.questionIndex * (100 / this.numOfQuestions)
    );
  }

  resetAnswers() {
    this.currentAnswer = null;

    for (
      let index = 0;
      index < this.answerss['nativeElement'].children.length;
      index++
    ) {
      let child: ElementRef = this.answerss['nativeElement'].children[index];
      setTimeout(() => {
        this.ren.removeClass(child, 'mat-radio-checked');
        this.ren.removeClass(child, 'cdk-program-focused');
      }, 100);
    }
  }

  goToPrevQuestion() {
    this.questionIndex--;
    if (this.questionIndexInSection == 0 && this.sectionIndex > 0) {
      this.sectionIndex--;
      this.questionIndexInSection =
        this.questionnaire.sections[this.sectionIndex].questions.length - 1;
    } else {
      this.questionIndexInSection--;
    }

    this.questionnaireCompleted = false;
    this.currentAnswer = this.answers[this.questionIndex];
    this.updateProgressBar();
  }

  checkProgress() {
    this.updateProgressBar();
    this.questionnaire.sections[this.sectionIndex].questions.length ==
    this.questionIndexInSection
      ? this.numOfQuestions == this.questionIndex
        ? this.onQuestionnaireFinished()
        : this.moveToNextSection()
      : null;
  }

  sendQuestionnaire() {
    // TODO: remove demo code and implement real api
    this.qs.setQustionnaireData(this.answers);

    console.log(this.us.getPatientData());

    const responseBody = {
      userId: this.us.getPatientData().userInfo.userId,
      timestamp: new Date().toISOString(),
      questionnaireId: this.questionnaireId,
      name: this.questionnaireName,
      answers: this.answers,
    };
    this.api
      .sendQuestionnaireAnswers(responseBody)
      .subscribe((res) => this.router.navigate(['/']));
  }

  toggleOption(ans) {
    const answerIndex = this.answersArrayOfCurrentMarkingQuestion.indexOf(ans);
    answerIndex !== -1
      ? this.answersArrayOfCurrentMarkingQuestion.splice(answerIndex, 1)
      : this.answersArrayOfCurrentMarkingQuestion.push(ans);
  }

  isSelected(ans) {
    return this.answersArrayOfCurrentMarkingQuestion.indexOf(ans) !== -1;
  }

  onSelect(el) {
    this.onAnswer(el.value);
    this.resetAnswers();
  }

  onAnswer(value) {
    this.answers[this.questionIndex] =
      typeof value != 'string' ? value.toString() : value;
    this.advanceQuestion();
  }

  advanceQuestion() {
    this.questionIndexInSection++;
    this.questionIndex++;
    this.currentAnswer = this.answers[this.questionIndex];
    this.checkProgress();
  }

  addMarkingSelectionToAnswerArray() {
    this.answers[this.questionIndex] =
      this.answersArrayOfCurrentMarkingQuestion;
    this.advanceQuestion();
  }
}
