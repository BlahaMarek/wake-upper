<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Score</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="container">
        <section class="ion-text-center ion-padding-vertical">
          Last update: <br>
          <span v-if="score.date">{{score.date.toLocaleDateString("sk-SK")}}</span>

        </section>
        <section class="ion-padding">
          <div class="score ion-text-center ion-margin-top">
            <div>
              Marek
              <h2>{{score.marek}}</h2>
            </div>
            <div>
              Majka
              <h2>{{score.majka}}</h2>
            </div>
          </div>
        </section>
        <br><br>
        <section class="vote" v-if="score.date">
          <div class="marek" @click="writeScore('marek')">Marek</div>
          <div class="majka" @click="writeScore('majka')">Majka</div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, loadingController } from '@ionic/vue'
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore'
import firebase from '@/firebaseInit'

export default {
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar
  },
  data() {
    return {
      docRef: null,
      docSnap: null,
      score: {
        marek: 0,
        majka: 0,
        date: null
      }
    }
  },

  async created() {
    await this.initState()
  },

  methods: {
    async initState() {
      const loading = await loadingController.create({
        message: 'Loading...',
        duration: 3000,
        spinner: 'circles'
      })

      loading.present()

      this.docRef = doc(firebase, "wakeup_record_tracker", 'tracker' )
      this.docSnap = await getDoc(this.docRef)
      const data = this.docSnap.data()

      if (!this.docSnap.exists()) {
        return
      }
      this.score.marek = data.marek
      this.score.majka = data.majka
      this.score.date = data.date.toDate()
      loading.remove()
    },
    async writeScore(user) {
      if (this.score.date.setHours(0,0,0,0) == (new Date()).setHours(0,0,0,0)) {
        alert('Already voted')
        return
      }
      this.score[user]++
      this.score.date = new Date()

      await setDoc(this.docRef, {
        marek: this.score.marek,
        majka: this.score.majka,
        date: Timestamp.fromDate(new Date())
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.score {
  display: flex;
}
.score div {
  width: 50%;
}
.vote {
  display: flex;
  flex: 1;
}
.vote div {
  width: 50%;
  text-align: center;
  padding-top: 20vh;
  font-size: 2em;
}
.marek {
  background: #792b2b;
}

.majka {
  background: #104d10;
}

h2 {
  font-size: 3rem;
}
</style>
