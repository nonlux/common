import $ from 'jquery';

export default function foo() {
  $(document).ready(() => {
    setTimeout(() => {
      console.log('timeout');
      $('li').click(({ currentTarget }) => {
        console.log($(currentTarget).attr('id'));
      });
    }, 1000);
  });
}
