import { Observable, interval, asyncScheduler, animationFrameScheduler, timer, fromEvent, merge } from 'rxjs';
import { observeOn, takeUntil, filter, map, startWith, scan, switchMap, tap, skip, exhaustMap, mapTo } from 'rxjs/operators';

console.clear();
const l = console.log;

// SCHEDULERS
 
// const observable = new Observable((observer) => {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.complete();
// }).pipe(
//   // observeOn(asyncScheduler)
// );
 
// console.log('before subscribe');
// observable.subscribe({
//   next(x) {
//     console.log('got value ' + x)
//   },
//   complete() {
//      console.log('done');
//   }
// });
// console.log('after subscribe');

// SCHEDULERS - animation example

// const round = document.querySelector('.round') as any;

// const movement$ = 
//   // interval(1000/60)
//   interval(0)
//   .pipe(
//     takeUntil(timer(2000)),
//     observeOn(animationFrameScheduler)
//   )

// movement$.subscribe(val => {
//   round.style.transform = `translate3d(0, ${val}px, 0)`
// })

// SCHEDULERS - more complex animation example

const round = document.querySelector('.round') as any;

const keyUp$ = fromEvent(window, 'keydown')
  .pipe(
    filter((ev: any) => ev.keyCode === 38),
    map(() => ({x: 0, y: -1}))
  )
const keyDown$ = fromEvent(window, 'keydown')
  .pipe(
    filter((ev: any) => ev.keyCode === 40),
    map(() => ({x: 0, y: 1}))
  )
const keyLeft$ = fromEvent(window, 'keydown')
 .pipe(
    filter((ev: any) => ev.keyCode === 37),
    map(() => ({x: -1, y: 0}))
  )
const keyRight$ = fromEvent(window, 'keydown')
  .pipe(
    filter((ev: any) => ev.keyCode === 39),
    map(() => ({x: 1, y: 0}))
  )

const position = {x: 50, y: 50};

const updatePosition = (ammount) => (pos) => ({
  x: pos.x * ammount + position.x,
  y: pos.y * ammount + position.y,
})

const keyArrows$ = merge(keyUp$, keyDown$, keyLeft$, keyRight$)

const movement$ = keyArrows$
  .pipe(
    tap(l),
    scan(updatePosition(100), position),
    skip(1),
  )


movement$.subscribe(pos => {
  round.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
})

// const movement$ = 
//   interval(0)
//   .pipe(
//     takeUntil(timer(2000)),
//     observeOn(animationFrameScheduler)
//   )

// movement$.subscribe(val => {
//   round.style.transform = `translate3d(0, ${val}px, 0)`
// })