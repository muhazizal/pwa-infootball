class TestApp extends HTMLElement {
	constructor() {
		super();
		this.shadowDOM = this.attachShadow({
			mode: 'open',
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const materialize = 'materialize-css';

		this.shadowDOM.innerHTML = `
      <style>
        ${materialize}

        $test: #fff;

        li {
          a {
            color: $test;
          }
        }

      </style>

      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Logo</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="">Sass</a></li>
            <li><a href="">Components</a></li>
            <li><a href="">JavaScript</a></li>
          </ul>
        </div>
      </nav>
    `;
	}
}

customElements.define('test-app', TestApp);
